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
                  <i class="fas fa-user"></i>
                </div>
                <div class="spur-card-title">Edit Employee</div>
              </div>
              <div class="card-body ">
                <form @submit.prevent action method>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                     <label class="control-label" for="employee_id">Employee Id</label>
                      <input type="text" class="form-control"   disabled  v-model="employee_id" placeholder="Employee Id" />
                     
                    </div>
                    <div class="form-group col-md-6">
                     <label class="control-label" for="fullname"> Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="fullname"
                        placeholder="Fullname"
                      />
                    </div>
                  </div>

                  <div class="form-row">
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
                    <div class="form-group col-md-6">
                   <label for="position">Position</label>
                      <select id="position" class="form-control" v-model="position">
                        <option value="" selected disabled>
                          Please Select...</option
                        >
                        <option
                          v-for="collectionpositions in collectionposition"
                          v-bind:key="collectionpositions"
                          >{{ collectionpositions.position }}</option
                        >
                      </select>
                    </div>
                  </div>
                  

                  &nbsp; &nbsp;
                  <div class="row">
                    <div class="col-xl-6" style="text-align: right">
                      <button v-on:click="updateEmployee()"
                       
                        type="button"
                        class="btn btn-outline-success mb-1"
                      >
                      Update Employee
                      </button>
                      &nbsp;
                        <button
                        v-on:click="takemebacktoemp"
                      
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
  name: "editemployee",
  data() {
    return {
      employee_id: null,
      fullname: null,
      dept: null,
      department: [],
      collectionposition: [],
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



  created() {
    this.isLoading = true;
       db.collection("collectionposition")
      .orderBy("position")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
          
            position: doc.data().position
          };
          this.collectionposition.push(data);
          
        });
      });
   
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
    updateEmployee(){
        this.isLoading= true;
        db.collection("employees")
        .where("employee_id", "==", this.$route.params.employee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            

            doc.ref.update({
                employee_id: this.employee_id,
                fullname: this.fullname,
                dept: this.dept,
                position: this.position
            })
            .then (()=>{
                 toast.success("Employee Update Successfully", "Success", 3000);
                this.$router.push({fullname: "/app/employeelist",
                params:{employee_id: this.employee_id}})
            })
          });
        });

    
    },
    takemebacktoemp(){
      this.$router.push("/app/employeelist")
    }
  }
};
</script>

<style scoped></style>
