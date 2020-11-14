<template>
<div class=container>
<div class="card">
    <form action="" id="signUp-form" v-on:submit.prevent="submit">
    <div class="row">
      <div class="head1 col-12 d-flex justify-content-start">Book Store</div>
      <div class="head2 col-12 d-flex justify-content-start">Create Book Store Account</div>
      <div class="col-6 form-group">
        <label for="" class="col-form-label-lg">First Name<span class="text-danger">*</span></label>
        <input type="text" v-model.trim="$v.firstName.$model" :class="{'is-invalid': validationStatus($v.firstName)}" class="form-control" />
        <div v-if="!$v.firstName.required" class="invalid-feedback">First name is required</div>
      </div>
      <div class="col-6 form-group">
        <label for="" class="col-form-label-lg">Last Name<span class="text-danger">*</span></label>
        <input type="text" v-model.trim="$v.lastName.$model" :class="{'is-invalid': validationStatus($v.lastName)}" class="form-control" />
        <div v-if="!$v.lastName.required" class="invalid-feedback">Last name is required</div>
      </div>
      <div class="col-6 form-group">
        <label for="" class="col-form-label-lg">Phone Number<span class="text-danger">*</span></label>
        <input type="text" v-model.trim="$v.phoneNumber.$model" :class="{'is-invalid': validationStatus($v.phoneNumber)}" class="form-control" />
        <div v-if="!$v.phoneNumber.required" class="invalid-feedback">Phone number is required</div>
      </div>
      <div class="col-6 form-group">
        <label for="" class="col-form-label-lg">Role<span class="text-danger">*</span></label>
        <input type="text" v-model.trim="$v.role.$model" :class="{'is-invalid': validationStatus($v.role)}" class="form-control" />
        <div v-if="!$v.role.required" class="invalid-feedback">Role is required</div>
      </div>
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
        <a class="link" href="\login">Sign in instead</a>
        <button class="btn btn-vue btn-lg col-5">Register</button>
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
 name: "signUp-form",
 data: function(){
   return {
     firstName: '',
     lastName: '',
     role: '',
     phoneNumber: '',
     email: '',
     password: ''
   }
 },
 validations:{
   firstName: {required},
   lastName: {required},
   role: {required},
   phoneNumber: {required},
   email: {required, email},
   password: {required, minLength: minLength(8), maxLength: maxLength(15)}
 },
 methods: {
   validationStatus: function(validation){
     return typeof validation != "undefined" ? validation.$error : false;
   },
   submit: function(){
     this.$v.$touch();
     if (this.$v.$pendding || this.$v.$error) {
       return;
     }
     else {
       this.register();
     }
   },
   register(){
     let data = {
       firstName: this.firstName,
       lastName: this.lastName,
       role: this.role,
       phoneNumber: this.phoneNumber,
       emailId: this.email,
       password: this.password
     };
     userService.register(data).then(result => {
       if (result.status == "200"){
        window.location.href="/login";
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
      this.firstName = null;
      this.lastName = null;
      this.role = null;
      this.phoneNumber = null;
      this.email = null;
      this.password = null;
    }
 }
}
</script>

<style>
.card{
    width: 450px;
    padding: 20px;
}
.btn-vue {
  background-color: #A03037;
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