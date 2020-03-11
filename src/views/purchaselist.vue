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
                  <i class="fas fa-store"></i>
                </div>
                <div class="spur-card-title">Purchase History</div>
              </div>
              <div class="card-body ">
                <div class="input-group">
      <input type="text" id="myInput" class="form-control" size="40" placeholder="Filter">
       </div>
               <br/>
               
  <p style="color: red;">Note* search by Item,department,amount </p>
                 <table class="table table-bordered "  >
                  
    <thead>
      <tr>
        <th>Date of Purchase</th>
        <th>Item</th>
        <th>Department</th>
        <th> Amount</th>
       
      </tr>
    
    </thead>
    <tbody id="myTable">
      <tr v-for="purchase in purchase"
                    v-bind:key="purchase.id">
                   
                     
      <td>
          {{ purchase.dop }} 
       
      </td>
    
      
        <td>{{ purchase.item }}</td>
       
   
      
        <td>{{purchase.dept}}</td>
        <td><span class="badge badge-pill badge-primary">{{
                      purchase.amount
                    }}</span>
        
           <router-link 
                    class="float-right"
                  
                      v-bind:to="{
                        name: 'viewpurchase',
                        params:{dop    : purchase.dop}
                      
                      }"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                   </td>
                  <td>
                    

                    </td>
                   
                   

                  
                 
      </tr>
      
      
    </tbody>
 
    
  </table>
 
     
               

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
              
                <button type="button" @click="moveto()" class="btn btn-outline-success float-right"><i class="fas fa-plus"></i>Add purchase</button>
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
  name: "purchaselist",
  data() {
    return {
      purchase: [],
      loadingIconColor:"#00b8d0",
       isLoading: false,
    }
  },


  created() {
    this.isLoading = true
    db.collection("purchase")
     .orderBy('item')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            // purchase_id: doc.data().purchase_id,
            // pid: doc.data().pid,
            amount: doc.data().amount,
            dept: doc.data().dept,
            dop: doc.data().dop,
            item: doc.data().item
          };
          this.purchase.push(data);
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
    total(){
    console.log(purchase.amount);
    return this.amount.reduce(function(total, amount){

      return total + item.amount; 
    },0);
  },

computed:{
 total(){
    console.log(this.amount);
    return this.amount.reduce(function(total, amount){

      return total + item.amount; 
    },0);
  },
   moveto(){
    this.$router.push('/app/addpurchase');
  }

},


  



 


}
</script>

<style scoped>

</style>
