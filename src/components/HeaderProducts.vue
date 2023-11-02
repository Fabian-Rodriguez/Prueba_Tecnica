<template>
  <div class="flex" style="justify-content: space-between">
    <Avatar class="p-overlay-badge" icon="pi pi-user" size="large" />
    <div>
      <Button
        type="button"
        label="STORE"
        severity="primary"
      />
    </div>
    <Button
      type="button"
      label="Shopping cart"
      icon="pi pi-shopping-cart"
      severity="secondary"
      :badge="lenProducts.toString()"
      badgeClass="p-badge-info"
      @click="seeCart()"
    />

  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
  },
  components: {

  },
  setup(props, { emit }) {
    const store = useStore();
    const lenProducts = computed(() => store.getters["lenProducts"]);
    function seeCart() {
      emit("seeCart", true);
    }
    function hideCart() {
      emit("hideCart", true);
    }
    return {
      lenProducts,
      seeCart,
      hideCart,
    };
  },
};
</script>

<style></style>
