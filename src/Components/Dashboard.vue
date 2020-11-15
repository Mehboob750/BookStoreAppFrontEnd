<template>
<div class="dashboard-container">
<div class="toolbar">
    <img class="image" src="../assets/education.png">
    <span class="title">Book Store</span>
    <div class="col-8">
        <input type="text" class="form-control" placeholder="Search" />
    </div>
    <img class="image1" src="../assets/user2.png">
</div>
<div>
    <div class="btn-div">
    <b-button class="btn-book" href="\dashboard\addBook" >Add Book</b-button>
    </div>
    <md-table class="table">
      <md-table-row class="table-row">
        <md-table-head>Image</md-table-head>
        <md-table-head>Book Name</md-table-head>
        <md-table-head>Author Name</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Price</md-table-head>
        <md-table-head md-numeric>Quantity</md-table-head>
        <md-table-head>Update</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>

      <md-table-row class="table-row">
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell md-numeric>10</md-table-cell>
        <md-table-cell>
            <button class="button"><b-icon icon="pencil" class="btn-pencil rounded-circle p-2" variant="light" style="width: 40px; height: 40px;"></b-icon></button>
        </md-table-cell>
        <md-table-cell>
            <button class="button"><b-icon icon="trash" class="btn-delete rounded-circle p-2" variant="light" style="width: 40px; height: 40px;"></b-icon></button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        modalShow: false
      }
  }
}
</script>

<style>
.dashboard-container{
    height: 100%;
}
.toolbar{
    height: 8%;
    background:#A03037;
    display: flex;
    padding-left: 15%;
    padding-right: 15%;
    align-items: center;
}
.title{
    color: white;
    font-size: x-large;
    margin-left: 3%;
}
.text{
    margin-left: 4%;
}
.image1{
    height: 30px;
   margin-left: 3%;
}
.table{
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.table-row{
    border-block-end: none;
    border: 1px solid lightgray;
}
.btn-div{
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    margin-top: 50px;
}
.btn-pencil,.btn-delete,.btn-book{
    background: #A03037;
}
.button{
    background: none;
    border: none;
    outline: none;
}
</style>