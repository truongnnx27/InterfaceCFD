<template>
  <page-header></page-header>

  <cart-breadcrumb></cart-breadcrumb>
  <!-- Cart -->
  <section class="course-content cart-widget">
    <div class="container">
      <div class="student-widget">
        <div class="student-widget-group">
          <div class="row">
            <div class="col-lg-12">
              <div class="cart-head">
                <h4>Your cart (03 items)</h4>
              </div>
              <div class="cart-group">
                <!-- Add your cart items here dynamically -->
              </div>
              <div class="cart-total">
                <div class="row">
                  <div class="col-lg-12 col-md-12">
                    <div class="cart-subtotal">
                      <p>Subtotal <span>$600.00</span></p>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <h4>Choose Payment Method:</h4>
                    <div class="payment-methods">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="paypal"
                          value="paypal"
                          v-model="paymentMethod"
                        />
                        <label class="form-check-label" for="paypal">
                          Paypal
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="vnpay"
                          value="vnpay"
                          v-model="paymentMethod"
                        />
                        <label class="form-check-label" for="vnpay">
                          Vnpay
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="check-outs mt-3">
                      <button
                        @click="pay"
                        class="btn btn-primary"
                        :disabled="!paymentMethod"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Cart -->

  <layouts1></layouts1>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  data() {
    return {
      paymentMethod: null,
    };
  },
  methods: {
  async pay() {
    const amount = 60000; 
    const courseId = 1; 
    const userId = 1; 

    try {
      let paymentUrl;

      if (this.paymentMethod === 'paypal') {
        const response = await axios.post('http://localhost:8081/api/payments/paypal/pay', null, {
          params: {
            amount,
            courseId,
            userId,
          },
        });

        console.log('Response from PayPal API:', response.data);

        if (response.data && response.data.paymentUrl) {
          paymentUrl = response.data.paymentUrl;
          window.location.href = paymentUrl;
          return; // Dừng thực thi sau khi chuyển hướng
        }
      } else if (this.paymentMethod === 'vnpay') {
          const response = await axios.post(
            'http://localhost:8081/api/payments/vnpay/pay',
            null,
            {
              params: {
                amount,
                courseId,
                userId,
              },
            }
          );

          console.log('Response from VNPay API:', response.data);

          if (response.data && response.data.paymentUrl) {
            window.location.href = response.data.paymentUrl;
            return; 
          }
        }

      console.error('No payment URL received'); 

    } catch (error) {
      console.error('Error during payment:', error);
    }
  },
}
};
</script>
