<template>
    <div class="payment-success">
      <h1>Thanh toán thành công!</h1>
      <p>Cảm ơn bạn đã thanh toán. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất có thể.</p>
      <router-link to="/home/index" class="btn btn-primary">Quay về trang chủ</router-link>
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
  