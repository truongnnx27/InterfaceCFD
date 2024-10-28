<template>
    <div class="payment-success">

      <h1>Payment successful!</h1>
      <p>Thank you for your payment.</p>
      <router-link to="/home/index" class="btn btn-primary">Return to the home page</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaymentSuccess',
  };
  </script>
  
  <style scoped>
  .payment-success {
    text-align: center;
    margin: 50px;
  }
  .payment-success h1 {
    color: green;
  }
  .payment-success p {
    margin-bottom: 20px;
  }
  </style>