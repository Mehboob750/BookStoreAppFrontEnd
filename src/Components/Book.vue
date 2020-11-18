<template>
<div class="book-container d-flex justify-content-center align-items-center">
<div class="card">
    <form action="" id="book-form" v-on:submit.prevent="submit">
    <div class="row">
        <div class="head col-12 form-group d-flex justify-content-center align-items-center">
           <div class="title"><span class="text">{{book.title}} Book</span></div>
        </div>
        <div class="col-12 d-flex justify-content-center align-items-center">
            <img class="image1" :src="url">
        </div>
        <div class="input-image col-12 d-flex justify-content-center align-items-center">
           <input type="file" @change="onFileSelected" class="image-input">
        </div>
      <div class="col-6 form-group">
        <input type="text" v-model.trim="$v.bookName.$model" :class="{'is-invalid': validationStatus($v.bookName)}"  class="form-control" placeholder="Book Name" />
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
      <div class="col-12 btn-div form-group d-flex justify-content-space-between align-items-center">
        <a class="link" href="\dashboard">Back to dashboard</a>
        <button class="btn btn-vue btn-lg col-3">{{book.title}}</button>
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
 props: ['book'],
 name: "book-form",
 data: function(){
   return {
     bookName: '',
     authorName: '',
     price: '',
     quantity: '',
     description: '',
     bookImage:null,
     url:'../assets/add_image.png',
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
     console.log(this.book)
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
       }
   },
   
   submit: function(){
     this.$v.$touch();
     if (this.$v.$pendding || this.$v.$error) {
       return;
     }
     else {
         if(this.book.title == "Add"){
            this.addBook();
         }
         this.updateBook();
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
     bookService.addBook(formData,this.book.data.bookId).then(result => {
       if (result.status == "200"){
        this.makeToast('success',result.data.message);
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
   updateBook(){
    var formData = new FormData();
    formData.append("bookName", this.bookName);
    formData.append("authorName", this.authorName);
    formData.append("description", this.description);
    formData.append("price", this.price);
    formData.append("quantity", this.quantity);
    formData.append("image", this.bookImage);
    console.log(formData,this.book.data.bookId)
    bookService.updateBook(formData,this.book.data.bookId).then(result => {
       if (result.status == "200"){
        this.makeToast('success',result.data.message);
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
       makeToast(variant = null, message) {
        this.$bvToast.toast(message, {
          toaster:"b-toaster-bottom-center",
          variant: variant,
          solid: true
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
    margin: 10px 0 10px 0;
}
.btn-div{
    justify-content: space-between;
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
</style>