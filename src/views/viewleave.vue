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
                <div class="spur-card-title">View Leave</div>
              </div>
              <div class="card-body ">
                <ul class="list-group">
                  <li class="list-group-item">Full Name:{{ fullname }}</li>
                  <li class="list-group-item">
                    Start Date:{{ sdate }}
                  </li>
                  <li class="list-group-item">End Date:{{ edate }}</li>
                  <li class="list-group-item">Leave Type:{{ ltype }}</li>
                </ul>
              </div>
     
              <div class="row">
                <div class="col-xl-6" style="text-align: right">
                <!-- <router-link v-bind:to="{name: 'editemployee',
                params:{employee_id: employee_id}}">
  <button  class="btn btn-outline-success mb-1">Edit Employee</button>
</router-link> -->
                   &nbsp;
                  <button
                    v-on:click="moveto"
                    type="button"
                    class="btn btn-outline-secondary mb-1"
                  >
                    Back
                  </button>
                  &nbsp;
                  <button
                    v-on:click="deleteleave"
                    type="button"
                    class="btn btn-outline-danger mb-1"
                  >
                    Delete Leave
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
import { Vue, Component } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';


  components: {
    Loading 
  }

export default {
    name: "viewleave",
  data() {
    return {

        fullname: null,
        edate: null,
        sdate: null,
        ltype: null,
      leaverequest: [],
       loadingIconColor:"#00b8d0",
       isLoading: false
    };
  },
   beforeRouteEnter(to, from, next) {
    db.collection("leaverequest")
      .where("fullname", "==", to.params.fullname)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.fullname = doc.data().fullname;
            vm.edate = doc.data().edate;
            vm.sdate = doc.data().sdate;
            vm.ltype = doc.data().ltype;
          });
        });
      });
  },


 watch: {
    $route: "fetchData"
  },

 

  
  methods:{
        fetchData() {
     

      db.collection("leaverequest")
        .where("fullname", "==", this.$route.params.fullname)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.fullname = doc.data().fullname;
            (this.sdate = doc.data().sdate),
              (this.edate = doc.data().edate),
              (this.ltype = doc.data().ltype);
          });
        });
    },

  
   
    deleteleave(){

      if (confirm('Are you sure you want to delete leave')){
         this.isLoading = true;
        db.collection("leaverequest").where  ("fullname",  '==',
        this.$route.params.fullname).get()
        .then(querySnapshot =>{
          querySnapshot.forEach( doc => {
            doc.ref.delete()
             this.isLoading = false;
            toast.success("leave Deleted Successfully", "Success", 3000);
            this.$router.push("app/leavelist")
          })
        })



      }
      alert("an error occured, try again ")
    },
    moveto(){
    this.$router.push('/app/leavelist');
  },

  }


}
</script>

<style scoped>


</style>
