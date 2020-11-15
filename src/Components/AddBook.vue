<template>
<div class="book-container d-flex justify-content-center align-items-center">
<div class="card">
    <form action="" id="addBook-form" v-on:submit.prevent="submit">
    <div class="row">
        <div class="head col-12 form-group d-flex justify-content-center align-items-center">
           <div class="title"><span class="text">Add Book</span></div>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center">
            <img class="image1" src="../assets/add_image.png">
        </div>
        <div class="input-image col-12 d-flex justify-content-center align-items-center">
           <input type="file" @change="onFileSelected" class="image-input">
        </div>
      <div class="col-6 form-group">
        <input type="text" v-model.trim="$v.bookName.$model" :class="{'is-invalid': validationStatus($v.bookName)}" class="form-control" placeholder="Book Name" />
        <div v-if="!$v.bookName.required" class="invalid-feedback">Book name is required</div>
      </div>
      <div class="col-6 form-group">
        <input type="text" v-model.trim="$v.authorName.$model" :class="{'is-invalid': validationStatus($v.authorName)}" class="form-control" placeholder="Author Name" />
        <div v-if="!$v.authorName.required" class="invalid-feedback">Author name is required</div>
      </div>
       <div class="col-12 form-group">
        <input type="text" v-model.trim="$v.description.$model" :class="{'is-invalid': validationStatus($v.description)}" class="form-control" placeholder="Description" />
        <div v-if="!$v.description.required" class="invalid-feedback">Description is required</div>
      </div>
      <div class="col-6 form-group">
        <input type="text" v-model.trim="$v.price.$model" :class="{'is-invalid': validationStatus($v.price)}" class="form-control" placeholder="Price" />
        <div v-if="!$v.price.required" class="invalid-feedback">Price is required</div>
      </div>
      <div class="col-6 form-group">
        <input type="text" v-model.trim="$v.quantity.$model" :class="{'is-invalid': validationStatus($v.quantity)}" class="form-control" placeholder="Quantity" />
        <div v-if="!$v.quantity.required" class="invalid-feedback">Quantity is required</div>
      </div>
      <div class="col-12 btn-div form-group d-flex justify-content-center align-items-center">
        <button class="btn btn-vue btn-lg col-3">Add</button>
      </div>
    </div>
  </form>
</div>
</div>
</template>

<script>
import bookService from "../Services/bookService.js";
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
 name: "signUp-form",
 data: function(){
   return {
     bookName: '',
     authorName: '',
     price: '',
     quantity: '',
     description: '',
     bookImage:null,
     imageLink:'../assets/add_image.png',
     url:''
   }
 },
 validations:{
   bookName: {required},
   authorName: {required},
   description: {required},
   price: {required},
   quantity: {required},
 },
 methods: {
   validationStatus: function(validation){
     return typeof validation != "undefined" ? validation.$error : false;
   },
   onFileSelected(event){
       //store the image details
       this.bookImage = event.target.files[0];
       console.log(this.bookImage);
       // for url purpose
       let image = event.target.files[0];
       let reader = new FileReader();
       reader.readAsDataURL(image);
        console.log(reader);
       reader.onload = event => {
        this.url = event.target.result;
        console.log(this.url);
       }
   },
   
   submit: function(){
     this.$v.$touch();
     if (this.$v.$pendding || this.$v.$error) {
       return;
     }
     else {
       this.addBook();
     }
   },
   addBook(){
    var formData = new FormData();
    formData.append("bookName", this.bookName);
    formData.append("authorName", this.authorName);
    formData.append("description", this.description);
    formData.append("price", this.price);
    formData.append("quantity", this.quantity);
    formData.append("image", this.bookImage);
    console.log(formData)
     bookService.addBook(formData).then(result => {
       if (result.status == "200"){
        window.location.href="/dashboard";
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
      this.bookName = null;
      this.authorName = null;
      this.description = null;
      this.price = null;
      this.quantity = null;
    }
 }
}
</script>

<style>
.book-container{
    height: 100%;
}
.card{
    width: 450px;
    padding: 20px;
}
.row{
    margin-top: 10px;
}
.btn-vue {
  background-color: #A03037;
  color: white;
  /* margin-left: 50px; */
}
.head{
    margin-bottom: 0px;
}
.title{
    background-color: #A03037;
    height: 35px;
    width: 408px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.text{
     color: white;
}
.input-image{
    margin: 0 0 20px 50px;
}
.image1{
    height: 120px;
}
.btn-div{
    justify-content: space-between;
}
</style>