const app = Vue.createApp({
  data() {
    return {
      product: 'Vinh Socks Shop',
      image: './socks_green.jpg',
      inStock: true,
      onSale: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
      sizes: ['small', 'medium', 'large'],
      variants: [
        { id: 201, color: 'green' },
        { id: 202, color: 'blue' }
      ]
    }
  }
});
