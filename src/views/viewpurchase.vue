<template>
  <div>
    <main class="dash-content">
      
     <loading :active.sync="isLoading" :can-cancel="true" :color="loadingIconColor"></loading>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fas fa-table"></i>
                </div>
                <div class="spur-card-title">View Purchase</div>
              </div>
              <div class="card-body ">
                <ul class="list-group">
                  <li class="list-group-item">Amount:{{ amount }}</li>
                  <li class="list-group-item">
                    Date Purchased:{{ dop }}
                  </li>
                  <li class="list-group-item">Department:{{ dept }}</li>
                  <li class="list-group-item">Item Purchased:{{ item }}</li>
                </ul>
              </div>
     
              <div class="row">
                <div class="col-xl-6" style="text-align: right">
                 <router-link v-bind:to="{name: 'editpurchase',
                params:{dop: dop}}">
  <button  class="btn btn-outline-success mb-1">Edit Item Purchased</button>
</router-link>
                   &nbsp;
                  <button
                    v-on:click="takemebacktoemp"
                    type="button"
                    class="btn btn-outline-secondary mb-1"
                  >
                    Back
                  </button>
                  &nbsp;
                  <button
                    v-on:click="deleteItem"
                    type="button"
                    class="btn btn-outline-danger mb-1"
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import db from "../components/firebaseInit";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';

components: {

  Loading
}

export default {
  name: "viewpurchase",
  data() {
    return {
      dop: null,
      dept: null,
      amount: null,
      item: null,
       loadingIconColor:"#00b8d0",
       isLoading: false

    };
  },

  beforeRouteEnter(to, from, next) {
    db.collection("purchase")
      .where("dop", "==", to.params.dop)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.amount = doc.data().amount;
            vm.dept = doc.data().dept;
            vm.dop = doc.data().dop;
            vm.item = doc.data().item;
          });
        });
      });
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    fetchData() {
     

      db.collection("purchase")
        .where("item", "==", this.$route.params.item)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.dop = doc.data().dop;
            (this.amount = doc.data().amount),
              (this.item = doc.data().item),
              (this.dept = doc.data().dept);
          });
        });
    },
    deleteItem(){

      if (confirm('Are you sure you want to delete this item')){
         this.isLoading = true;
        db.collection("purchase").where  ("dop",  '==',
        this.$route.params.dop).get()
        .then(querySnapshot =>{
          querySnapshot.forEach( doc => {
            doc.ref.delete()
             this.isLoading = false;
            toast.success("Item Deleted Successfully", "Success", 3000);
            this.$router.push("app//purchaselist")
          })
        })



      }
    },
    takemebacktoemp(){
      this.$router.push("/app/purchaselist")
    },
    takemetoupdate(){
      this.$router.push("/app/editemployee")
    }
  }
};
</script>

<style scoped>
</style>
