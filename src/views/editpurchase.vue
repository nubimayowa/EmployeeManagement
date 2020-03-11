<template>
  <div>
    <main class="dash-content">
      
     <loading :active.sync="isLoading" :can-cancel="true" :color="loadingIconColor"></loading>
      <div class="container-fluid">
        
        <div class="row">
          <div class="col-xl-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fas fa-store"></i>
                </div>
                <div class="spur-card-title">Edit Item</div>
              </div>
              <div class="card-body ">
                <form @submit.prevent action method>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                     <label class="control-label" for="amount">Amount Id</label>
                      <input type="text" class="form-control"   disabled  v-model="amount" placeholder="Amount" />
                     
                    </div>
                       <div class="form-group col-md-6">
                      <label for="dept">Department</label>
                      <select id="dept" class="form-control" v-model="dept">
                        <option value="" selected disabled>
                          Please Select...</option
                        >
                        <option
                          v-for="departments in department"
                          v-bind:key="departments"
                          >{{ departments.dept }}</option
                        >
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                       <label class="control-label" for="dop"> Date Of Purchase</label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="dop"
                        required
                      
                      />
                    </div>
                    <div class="form-group col-md-6">
                   <label class="control-label" for="item">Item</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="item"
                        required
                        placeholder="Item"
                      />
                    </div>
                  </div>
                  

                  &nbsp; &nbsp;
                  <div class="row">
                    <div class="col-xl-6" style="text-align: right">
                      <button v-on:click="updateItem()"
                       
                        type="button"
                        class="btn btn-outline-success mb-1"
                      >
                      Update Item
                      </button>
                      &nbsp;
                        <button
                        v-on:click="backToPurchase"
                      
                        type="button"
                        class="btn btn-outline-danger mb-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
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
  name: "editpurchase",
  data() {
    return {
      department: [],
      item: null,
      amount: null,
      dept: null,
      dop: null,
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
            vm.dept = doc.data().dept;
            vm.dop = doc.data().dop;
            vm.amount = doc.data().amount;
            vm.item = doc.data().item;
          });
        });
      });
  },

  watch: {
    $route: "fetchData"
  },

   created() {
    this.isLoading = true;
       db.collection("department")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            dept: doc.data().dept
          };
          this.department.push(data);
          this.isLoading = false;
        });
      });
      },


  methods: {
    fetchData() {
     

      db.collection("purchase")
        .where("item", "==", this.$route.params.item)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.item = doc.data().item;
            (this.dop = doc.data().dop),
              (this.dept = doc.data().dept),
              (this.amount = doc.data().amount);
          });
        });
      
   
    },
    updateItem(){
        this.isLoading= true;
        db.collection("purchase")
        .where("dop", "==", this.$route.params.dop)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            

            doc.ref.update({
                item: this.item,
                amount: this.amount,
                dept: this.dept,
                dop: this.dop
            })
            .then (()=>{
                 toast.success("Item Update Successfully", "Success", 3000);
                this.$router.push({item: "/app/purchaselist",
                params:{item: this.item}})
            })
          });
        });

    
    },
    backToPurchase(){
      this.$router.push("/app/purchaselist")
    }
  }
};
</script>

<style scoped></style>
