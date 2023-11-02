<script>
import TableProducts from "./components/TableProducts.vue";
import HeaderProducts from "./components/HeaderProducts.vue";
import SideBar from "./components/SideBar.vue";
import { ref, onMounted, watch, computed } from "vue";
export default {
  components: {
    HeaderProducts,
    SideBar,
    TableProducts,
  },
  setup() {
    const showCart = ref(false);
    function seeCart() {
      showCart.value = true;
    }
    function hideCart() {
      showCart.value = false;
    }

    return {
      showCart,
      seeCart,
      hideCart,
    };
  },
};
</script>

<template>
  <SideBar :visibleLeft="showCart" @hideCart="hideCart" />
  <div class="mb-4">
    <HeaderProducts
      @hideCart="hideCart()"
      @seeCart="seeCart()"
    />
  </div>
  <TableProducts />
</template>

<style scoped></style>
