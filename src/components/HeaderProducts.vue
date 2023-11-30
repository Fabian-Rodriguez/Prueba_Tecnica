<template>
  <div class="flex" style="justify-content: space-between">
    <Sidebar
      class="flex"
      style="justify-content: space-between"
      v-model:visible="visibleRight"
      header="left Sidebar"
      position="left"
    >
      <h1>Hola {{ nameUser.response }}</h1>
      <Button
        label="Cerrar sesion"
        @click="closeSesion()"
        icon="pi pi-user"
        class="w-10rem"
      ></Button>
    </Sidebar>

    <Avatar
      @click="visibleRight = true"
      class="p-overlay-badge"
      icon="pi pi-user"
      size="large"
    />
    <div>
      <Button type="button" label="STORE" severity="primary" />
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
import { ref } from "vue";
export default {
  props: {},
  components: {},
  setup(props, { emit }) {
    const visibleRight = ref();
    const store = useStore();
    const lenProducts = computed(() => store.getters["lenProducts"]);
    const nameUser = computed(() => store.getters["getName"]);
    function seeCart() {
      emit("seeCart", true);
    }
    function closeSesion() {
      store.commit("deleteUser");
      window.location.href = "/login";
    }
    function hideCart() {
      emit("hideCart", true);
    }
    return {
      lenProducts,
      seeCart,
      hideCart,
      visibleRight,
      nameUser,
      closeSesion,
    };
  },
};
</script>

<style></style>
