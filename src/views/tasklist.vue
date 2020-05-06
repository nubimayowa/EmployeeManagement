<template>
  <div>
    
       <loading :active.sync="isLoading" :can-cancel="true" :color="loadingIconColor"></loading>
    
    <main class="dash-content">
       

      <div class="container-fluid">
      
        
        <div class="row">
          <div class="col-lg-12">
            <div class="card spur-card">
              <div class="card-header">
                <div class="spur-card-icon">
                  <i class="fas fa-tasks"></i>
                </div>
                <div class="spur-card-title">TASK</div>
              </div>
              <div class="card-body ">
                        <div class="input-group">
      <input type="text" id="myInput" class="form-control" size="40" placeholder="Filter">
       </div>
               <br/>
               
  <!-- <p style="color: red;">Note* search by Item,department,amount </p> -->
                  <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">ALL TASK</a>
    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">MY TASKS</a>
    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">TASKS REVIEWED BY ME</a>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
      <br/>
    
                 <table class="table table-bordered "  >
                  
    <thead>
      <tr>
        <th>Title</th>
        <th>Priority</th>
        <th>Task Owner</th>
        <th>State Date</th>
        <th> End Date</th>
        <th> Supervisor</th>
        <th> Status</th>
       
      </tr>
    
    </thead>
    <tbody id="myTable">
      <tr v-for="assigntasks in assigntask"
                    v-bind:key="assigntasks.id">
                   
                     
      <td>
          {{ assigntasks.comment }} 
       
      </td>
    
      
        <td><span v-if ="assigntasks.priority =='Low' " class="badge badge-pill badge-success">{{
                      assigntasks.priority
                    }}</span>
                    <span v-if ="assigntasks.priority =='Medium' " class="badge badge-pill badge-primary">{{
                      assigntasks.priority 
                    }}</span>
                    <span v-if ="assigntasks.priority =='High' " class="badge badge-pill badge-danger">{{
                      assigntasks.priority
                    }}</span>

                    </td>
                       <td>
          {{ assigntasks.fullname }} 
       
      </td>
       
        <td>
          {{ assigntasks.sdate }} 
       
      </td>
      <td>
          {{ assigntasks.edate }} 
       
      </td>
      <td>
          {{ assigntasks.tsup }} 
       
      </td>
                    
        
        <td><span v-if ="assigntasks.stats =='Completed' " class="badge badge-pill badge-success">{{
                      assigntasks.stats
                    }}</span>
                    <span v-if ="assigntasks.stats =='In Progress' " class="badge badge-pill badge-primary">{{
                      assigntasks.stats
                    }}</span>
                    <span v-if ="assigntasks.stats =='On Hold'" class="badge badge-pill badge-warning">{{
                      assigntasks.stats
                    }}</span>
                    <span v-if ="assigntasks.stats =='Abandoned' " class="badge badge-pill badge-default">{{
                      assigntasks.stats
                    }}</span>
                    <span v-if ="assigntasks.stats =='Not Started' " class="badge badge-pill badge-danger">{{
                      assigntasks.stats
                    }}</span>
        
           <router-link 
                    class="float-right"
                  
                      v-bind:to="{
                        name: 'viewtask',
                        params:{fullname    : assigntasks.fullname}
                      
                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                   </td>
                 
                   

                  
                 
      </tr>
      
      
    </tbody>
 
    
  </table>
 
     


    </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
</div>
          
      
               

                <!-- <ul class="list-group">
                  <li
                    v-for="purchase in purchase"
                    v-bind:key="purchase.id"
                    class="list-group-item"
                  >
                    <span class="badge badge-pill badge-primary">{{
                      purchase.amount
                    }}</span>

               {{ purchase.dop }} :{{ purchase.item }}: {{purchase.dept}}

                   
                    <router-link 
                    class="float-right"
                  
                      v-bind:to="{
                        name: 'viewpurchase',
                        params:{dop    : purchase.dop}
                      
                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </li>
                </ul> -->
               <br/>
                <!-- <button type="submit" @click="moveto()" class="btn btn-primary">Add purchase</button> -->
              
                <button type="button" @click="moveto()" class="btn btn-outline-success float-right"><i class="fas fa-plus"></i>Assign Task </button>
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
// import { Vue, Component } from "vue-property-decorator";
import Loading from "vue-loading-overlay";
import toast from '@/store/modules/toast';
import $ from 'jquery';


components: {

  Loading
}

export default  {
  name: "tasklist",
  data() {
    return {
      assigntask: [],
      loadingIconColor:"#00b8d0",
       isLoading: false,
    }
  },


  created() {
    this.isLoading = true
    db.collection("assigntask")
    // .orderBy('priority')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
                id: doc.id,
              comment: doc.data().comment,
              edate: doc.data().edate,
              fullname: doc.data().fullname,
               priority: doc.data().priority,
              sdate: doc.data().sdate,
              stats:doc.data().stats,
              tsup:doc.data().tsup
          
          };
          this.assigntask.push(data);
          this.isLoading= false
        });
      });
  },

  mounted() {
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

   
    },
  

computed:{
 total(){
    console.log(this.amount);
    return this.amount.reduce(function(total, amount){

      return total + item.amount; 
    },0);
  },
   moveto(){
    this.$router.push('/app/assigntask');
  }

},


  



 


}
</script>

<style scoped>

</style>
