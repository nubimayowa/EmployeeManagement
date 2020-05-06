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
                <div class="spur-card-title">View Task</div>
              </div>
              <div class="card-body ">
                  <ul class="list-group">
  <li class="list-group-item ">
    Full Name
    <span class="badge badge-default badge-pill">{{fullname}}</span>
  </li>
  <li class="list-group-item ">
  Start Date 
    <span class="badge badge-default badge-pill">{{sdate}}</span>
  </li>
  <li class="list-group-item ">
   End Date 
    <span class="badge badge-default badge-pill">{{edate}}</span>
  </li>
  <li class="list-group-item">
  To Do
    <span class="badge badge-default badge-pill">{{comment}}</span>
  </li>
   <li class="list-group-item">
  Task Supervisor
    <span class="badge badge-default badge-pill">{{tsup}}</span>
  </li>
    
   <li class="list-group-item">
Status
    <span class="badge badge-default badge-pill">{{stats}}</span>
  </li>
        
  
   <li class="list-group-item">
Priority
    <span class="badge badge-default badge-pill">{{priority}}</span>
  </li>
                  </ul>
              </div>
     
              <div class="row">
                <div class="col-xl-6" style="text-align: right">
                <router-link v-bind:to="{name: 'updatetask',
                params:{fullname: fullname}}">
  <button  class="btn btn-outline-success mb-1">Update Task</button>
</router-link>
                   &nbsp;
                  <button
                    v-on:click="takemebacktotask"
                    type="button"
                    class="btn btn-outline-secondary mb-1"
                  >
                    Back
                  </button>
                  &nbsp;
                  <!-- <button
                    v-on:click="deleteEmployee"
                    type="button"
                    class="btn btn-outline-danger mb-1"
                  >
                    Delete Employee
                  </button> -->
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
  name: "viewtask",
  data() {
    return {
          comment: null,
              edate: null,
              fullname: null,
               priority:null,
              sdate: null,
              tsup:null,
              stats: null,
     
       loadingIconColor:"#00b8d0",
       isLoading: false

    };
  },

  beforeRouteEnter(to, from, next) {
    db.collection("assigntask")
      .where("fullname", "==", to.params.fullname)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.comment = doc.data().comment;
              vm.edate = doc.data().edate;
            vm.fullname = doc.data().fullname;
            vm.priority = doc.data().priority;
            vm.sdate = doc.data().sdate;
            vm.tsup = doc.data().tsup;
            vm.stats= doc.data().stats;
          });
        });
      });
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    fetchData() {
     

      db.collection("assigntask")
        .where("fullname", "==", this.$route.params.fullname)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.fullname = doc.data().fullname;
            (this.comment  = doc.data().comment),
            (this.stats=doc.data().stats),
              (this.edate = doc.data().edate),
              (this.priority = doc.data().priority);
                (this.sdate = doc.data().sdate);
                  (this.tsup = doc.data().tsup);
          });
        });
    },
    // deleteEmployee(){

    //   if (confirm('Are you sure you want to delete this Employee')){
    //      this.isLoading = true;
    //     db.collection("employees").where  ("employee_id",  '==',
    //     this.$route.params.employee_id).get()
    //     .then(querySnapshot =>{
    //       querySnapshot.forEach( doc => {
    //         doc.ref.delete()
    //          this.isLoading = false;
    //         toast.success("Employee Deleted Successfully", "Success", 3000);
    //         this.$router.push("app//employeelist")
    //       })
    //     })



    //   }
    // },
    takemebacktotask(){
      this.$router.push("/app/tasklist")
    },
    takemetoupdate(){
      this.$router.push("/app/editemployee")
    }
  }
};
</script>

<style scoped></style>
