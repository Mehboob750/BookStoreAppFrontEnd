<template>
<div class="login-container d-flex justify-content-center align-items-center">
<div class="card">
    <form action="" id="signIn-form" v-on:submit.prevent="submit">
    <div class="row">
      <div class="head1 col-12 d-flex justify-content-center align-items-center">Book Store</div>
      <div class="head2 col-12 d-flex justify-content-center align-items-center">Sign In</div>
      <div class="head3 col-12 d-flex justify-content-center align-items-center">Use your Book Store Account</div>
      <div class="col-12 form-group">
        <label for="" class="col-form-label-lg">Email Id<span class="text-danger">*</span></label>
        <input type="text" v-model.trim="$v.email.$model" :class="{'is-invalid': validationStatus($v.email)}" class="form-control" />
        <div v-if="!$v.email.required" class="invalid-feedback">Email is required</div>
        <div v-if="!$v.email.email" class="invalid-feedback">Email is not valid</div>
      </div>
      <div class="col-12 form-group">
        <label for="" class="col-form-label-lg">Password<span class="text-danger">*</span></label>
      <input type="password" v-model.trim="$v.password.$model" :class="{'is-invalid': validationStatus($v.password)}" class="form-control" />
        <div v-if="!$v.password.required" class="invalid-feedback">Password is required</div>
        <div v-if="!$v.password.minLength" class="invalid-feedback">You must have at least {{ $v.password.$params.minLength.min}} letters</div>
        <div v-if="!$v.password.maxLength" class="invalid-feedback">You must have at least {{ $v.password.$params.maxLength.max}} letters</div>
      </div>
      <div class="col-12 btn-div form-group d-flex justify-content-space-between align-items-center">
        <a class="link" href="\register">Create Account</a>
        <button class="btn btn-vue btn-lg col-5">Log In</button>
      </div>
    </div>
  </form>
</div>
</div>
</template>

<script>
import userService from "../Services/userService.js";
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: "signIn-form",
  data: function(){
   return {
     email: '',
     password: ''
   }
 },
 validations:{
   email: {required, email},
   password: {required, minLength: minLength(8), maxLength: maxLength(15)}
 },
 methods: {
   validationStatus: function(validation){
     return typeof validation != "undefined" ? validation.$error : false;
   },

   submit: function(){
     this.$v.$touch();
     if (this.$v.$pendding || this.$v.$error){
        return;
     }
     else{
       this.login();
     }
   },

   login(){
     let data = {
       emailId: this.email,
       password: this.password
     };
     userService.login(data).then(result => {
       if (result.status == "200"){
         this.isLogin = true;
         localStorage.setItem("FirstName", result.data.data.firstName);
         localStorage.setItem("LastName", result.data.data.lastName);
         localStorage.setItem("Role", result.data.data.role);
         localStorage.setItem("EmailId", result.data.data.emailId);
         localStorage.setItem("Token", result.data.data.token);
        // window.location.href="/dashboard";
        this.goToDashboard();
       }
     }).then( ()=> {
       this.clearForm();
     }).catch( error => {
       console.log("Error:", error.response.status);
       if (error.response.status == "401"){
         this.clearForm();
       }
       else if (error.response.status == "404"){
         this.clearForm();
       }
     })
   },
   clearForm() {
      this.$v.$reset();
      this.email = null;
      this.password = null;
    },
    goToDashboard(){
     let role = localStorage.getItem("Role");
     if (role == "Admin" || role == "admin"){
       window.location.href="/dashboard";
     }
      else{
        return;
      }
    }
 }
}

</script>

<style>
.login-container{
  height: 100%;
}
.card{
    width: 350px;
    padding: 20px;
}
.btn-vue {
  background-color:#A03037;
  color: white;
  /* margin-left: 50px; */
}
.head1 {
  color: #A03037;
  background: white;
  font-size: 25px;
}
.head2 {
  color: #A03037;
  background: white;
  font-size: 20px;
}
.head3 {
  color: #A03037;
  background: white;
  font-size: 18px;
}
.link {
  font-size: 15px;
  margin: 20px 10px;
  color: #A03037;
  display: inline-block;
  font-family: arial rounded mt;
}
a {
  display: block;
  position: relative;
  font-family: roboto;
  text-decoration: none;
}
.btn-div{
    justify-content: space-between;
}
</style>