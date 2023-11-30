import { createStore } from 'vuex';
import { localStoragePlugin } from './localStoragePlugin';
export default createStore({
  state: {
    products: [],
    userInfo: {
      name: null,
    },
  },
  mutations: {
    updateName(state, name) {
      state.userInfo.name = name
    },
    deleteUser(state) {
      state.userInfo.name = null
      state.products = []
    },
    addProductToCart(state, product) {
      state.products.push(product);
    },
    deleteProductToCar(state, product) {
      let index = 0
      for (let product1 of state.products) {
        if (product1.item.id == product.item) {
          break
        } else {
          index++
        }
      }
      state.products.splice(index, 1)
    }
  },
  actions: {

  },
  getters: {
    products(state) {
      let products = []
      for (let product of state.products) {
        products.push(product.item)
      }
      return products;
    },
    lenProducts(state) {
      return state.products.length
    },
    idsProducts(state) {
      let ids = []
      for (let product of state.products) {
        ids.push(product.item.id)
      }
      return ids
    },
    cartTotalPrice(state) {
      let totalPrice = 0
      for (let product of state.products) {
        totalPrice = totalPrice + product.item.price
      }
      return totalPrice
    },
    getName(state) {
      return state.userInfo.name
    },
  },
  plugins: [localStoragePlugin],
});
