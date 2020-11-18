<template>
  <div class="book-container">
    <Book :book="book" />
  </div>
</template>

<script>
import Book from './Book.vue'
export default {
name: 'addBook',
  components: {
    Book
  },
   data() {
   return {
     book: {
       title: 'Add',
       data: ''
     }
   }
 }
}
</script>

<style>
.book-container{
  height: 100%;
}
</style>