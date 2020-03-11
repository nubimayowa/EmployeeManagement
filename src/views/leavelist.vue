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
                  <i class="fas fa-plane"></i>
                </div>
                <div class="spur-card-title">Leave Tracking</div>
              </div>
              <div class="card-body ">
                                   <div class="input-group">
      <input type="text"  id="myInput" class="form-control" size="40" placeholder="Search...">
       </div>
               <br/>
                             <table class="table table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Type</th>
       
       
      </tr>
    </thead>
    <tbody id="myTable">
      <tr v-for="leaverequest in leaverequest"
                    v-bind:key="leaverequest.id">
      <td>
          {{ leaverequest.fullname }} 
       
      </td>
      
        <td>{{ leaverequest.sdate }}</td>
       
   
      
        <td>{{leaverequest.edate}}</td>
        <td><span class="badge badge-pill badge-primary">{{
                      leaverequest.ltype
                    }}</span>

                    
                    
                      <router-link
                    class="float-right"

                      v-bind:to="{
                        name: 'viewleave',
                        params:{fullname: leaverequest.fullname}

                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                    <!-- <span @click="deleteleave()">
<i
        class="fas fa-trash-alt "></i>
        
        
     
</span> -->
             <!-- <button type="button" @click="deleteleave()" class="btn btn-outline-danger float-right"><i class="fa fa-thrash"></i>Delete</button>  -->
                   </td>
      </tr>
     
    </tbody>
  </table>
<!--                

                <ul class="list-group">
                  <li
                    v-for="employee in employees"
                    v-bind:key="employee.id"
                    class="list-group-item"
                  >
                    <span class="badge badge-pill badge-primary">{{
                      employee.position
                    }}</span>

                    {{ employee.employee_id }}:{{ employee.fullname }}: {{employee.dept}}

                   
                  </li>
                </ul> -->
               <br/>
                <!-- <button type="submit" @click="moveto()" class="btn btn-primary">Add Employee</button> -->
              
                <button type="button" @click="moveto()" class="btn btn-outline-success float-right"><i class="fas fa-plus"></i>Add Request</button>
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
import $ from 'jquery';


@Component({
  components: {
    Loading 
  }
})
export default class leavelist extends Vue {
  data() {
    return {
      leaverequest: [],
       loadingIconColor:"#00b8d0",
       isLoading: false
    };
  }

  created() {
    this.isLoading= true;
    db.collection("leaverequest")
     .orderBy('fullname')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            sdate: doc.data().sdate,
            fullname: doc.data().fullname,
            edate: doc.data().edate,
            ltype: doc.data().ltype
          };
          this.leaverequest.push(data);
          this.isLoading = false
        });
      });
  }
  
  mounted() {
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    }
  

  moveto(){
    this.$router.push('/app/leavesetting');
  }
   
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
            this.$router.push("app/leavesetting")
          })
        })



      }
      alert("an error occured, try again ")
    }

    


}
</script>

<style scoped>


</style>
