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
                <div class="spur-card-title">View Employee</div>
              </div>
              <div class="card-body ">
                <ul class="list-group">
                  <li class="list-group-item">Full Name:{{ fullname }}</li>
                  <li class="list-group-item">
                    Employee ID#:{{ employee_id }}
                  </li>
                  <li class="list-group-item">Department:{{ dept }}</li>
                  <li class="list-group-item">Position:{{ position }}</li>
                </ul>
              </div>
     
              <div class="row">
                <div class="col-xl-6" style="text-align: right">
                <router-link v-bind:to="{name: 'editemployee',
                params:{employee_id: employee_id}}">
  <button  class="btn btn-outline-success mb-1">Edit Employee</button>
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
                    v-on:click="deleteEmployee"
                    type="button"
                    class="btn btn-outline-danger mb-1"
                  >
                    Delete Employee
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
  name: "viewemployee",
  data() {
    return {
      employee_id: null,
      fullname: null,
      dept: null,
      position: null,
       loadingIconColor:"#00b8d0",
       isLoading: false

    };
  },

  beforeRouteEnter(to, from, next) {
    db.collection("employees")
      .where("employee_id", "==", to.params.employee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id;
            vm.fullname = doc.data().fullname;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    fetchData() {
     

      db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.employee_id = doc.data().employee_id;
            (this.fullname = doc.data().fullname),
              (this.dept = doc.data().dept),
              (this.position = doc.data().position);
          });
        });
    },
    deleteEmployee(){

      if (confirm('Are you sure you want to delete this Employee')){
         this.isLoading = true;
        db.collection("employees").where  ("employee_id",  '==',
        this.$route.params.employee_id).get()
        .then(querySnapshot =>{
          querySnapshot.forEach( doc => {
            doc.ref.delete()
             this.isLoading = false;
            toast.success("Employee Deleted Successfully", "Success", 3000);
            this.$router.push("app//employeelist")
          })
        })



      }
    },
    takemebacktoemp(){
      this.$router.push("/app/employeelist")
    },
    takemetoupdate(){
      this.$router.push("/app/editemployee")
    }
  }
};
</script>

<style scoped></style>
