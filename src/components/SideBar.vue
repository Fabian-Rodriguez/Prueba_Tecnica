<template>
  <Sidebar :visible="visibleLeft" position="right" class="w-full md:w-20rem lg:w-30rem">
    <Button class="mt-3" icon="pi pi-times" @click="hideBar()" />

    <div v-if="storeProducts.length == 0">
      <Card class="mt-3">
        <template #title> There aren't any products </template>
        <template #content>
          <p class="m-0">There aren't any products in the shoping cart</p>
        </template>
      </Card>
    </div>
    <div v-else>
      <Card class="mt-3">
        <template #title> Total </template>
        <template #content>
          <p class="m-0">Total products: {{ lenProducts }}</p>
          <p class="m-0">Total price: {{ cartTotalPrice }}</p>
        </template>
      </Card>
    </div>

    <div v-for="storeProduct in storeProducts" :key="storeProduct.id">
      <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <img
          class="shadow-2 block xl:block mx-auto border-round"
          :src="`${storeProduct.image}`"
          :alt="storeProduct.title"
          width="40"
          height="50"
        />
        <div
          class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
        >
          <div class="flex flex-column align-items-center sm:align-items-start gap-3">
            <div class="text-2xl font-bold text-500">
              {{ storeProduct.title.slice(0, 15) }}
            </div>
            <div class="flex align-items-center gap-3">
              <span class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ storeProduct.category }}</span>
              </span>
            </div>
          </div>
          <div
            class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
          >
            <span class="text-2xl font-semibold">${{ storeProduct.price }}</span>
            <Button
              @click="removeToCart(storeProduct)"
              icon="pi pi-trash"
              severity="danger"
              rounded
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  props: {
    visibleLeft: Boolean,
  },
  components: {
  },
  setup(props, { emit }) {
    const store = useStore();

    const storeProducts = computed(() => store.getters["products"]);
    const lenProducts = computed(() => store.getters["lenProducts"]);
    const cartTotalPrice = computed(() => store.getters["cartTotalPrice"]);

    function hideBar() {
      emit("hideCart", true);
    }
    function removeToCart(item) {
      store.commit("deleteProductToCar", { item: item.id });
    }

    return {
      hideBar,
      storeProducts,
      lenProducts,
      cartTotalPrice,
      removeToCart,
    };
  },
};
</script>

<style>
body
  > div.p-sidebar-mask.p-component-overlay.p-component-overlay-enter.p-sidebar-visible.p-sidebar-right
  > div
  > div.p-sidebar-header {
  display: none !important;
}
</style>
