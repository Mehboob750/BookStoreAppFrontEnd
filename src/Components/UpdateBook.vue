<template>
  <div class="book-container">
    <Book :book="book" />
  </div>
</template>

<script>
import bookService from "../Services/bookService.js";
import Book from './Book.vue'
export default {
name: 'updateBook',
  components: {
    Book
  },
  created() {
    this.getIDfromURL();
    this.getBooks();
  },
   data() {
   return {
    id:'',
    books:[],
     book: {
       title: 'Update',
       data: ''
     }
    
   }
   },
   methods: {
       getBooks(){
            bookService.getBooks().then(result => {
                if (result.status == "200"){
                    this.books=result.data.data;
                    console.log(this.books);
                    console.log(this.id);
                    this.books.find(data => {
                        if (data.bookId == this.id) {
                            this.book.data=data;
                            console.log(this.book.data);
                        }
                    })
                }
                }).catch(error => {
                    console.log(error);
            });
           
        },
        getIDfromURL(){
            return this.id= window.location.pathname.split('/')[3];
        },
       
   }
}
</script>

<style>
    .book-container{
    height: 100%;
    }
</style>