<template>
  <div class="card">
    <Toast />
    <DataView :value="products" :layout="layout">
      <template #header>
        <div
          class="flex col-12 sm:col-12 lg:col-12 xl:col-12"
          style="justify-content: space-between !important"
        >
          <div class="col-9 sm:col-4 lg:col-8 xl:col-9">
            <div>
              <Dropdown
                v-model="selectedCategory"
                editable
                :options="categories"
                placeholder="Select a category"
                class="w-full ml-2 md:w-14rem"
                showClear
                @change="searchProductsCategory()"
              />
              <span class="ml-2 p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="search" placeholder="Search product" />
              </span>
            </div>
          </div>
          <div class="flex justify-content-end col-4 sm:col-2 lg:col-2 xl:col-3">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center mt-4">
          <Card v-if="search">
            <template #title> There aren't any products </template>
            <template #content>
              <p class="m-0">There aren't any products with that name</p>
            </template>
          </Card>
          <ProgressSpinner
            v-else
            style="width: 50px; height: 50px"
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
          />
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img
              class="w-6 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="`${slotProps.data.image}`"
              :alt="slotProps.data.title"
              width="180"
              height="180"
            />
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
            >
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">{{ slotProps.data.title }}</div>
                <Rating
                  :modelValue="slotProps.data.rating.rate"
                  readonly
                  :cancel="false"
                ></Rating>
                <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center gap-2">
                    <i class="pi pi-tag"></i>
                    <span class="font-semibold">{{ slotProps.data.category }}</span>
                  </span>
                </div>
              </div>
              <div
                class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
              >
                <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
                <Button
                  v-if="verifiAdded(slotProps.data)"
                  icon="pi pi-shopping-cart"
                  rounded
                  @click="addToCart(slotProps.data)"
                ></Button>
                <Button
                  v-else
                  icon="pi pi-check"
                  rounded
                  @click="productAdded()"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ slotProps.data.category }}</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img
                class="w-3 shadow-2 border-round"
                :src="`${slotProps.data.image}`"
                :alt="slotProps.data.title"
                width="180"
                height="180"
              />
              <div class="text-2xl font-bold" :title="slotProps.data.title">
                {{ slotProps.data.title.slice(0, 25) }}
              </div>
              <Rating
                :modelValue="slotProps.data.rating.rate"
                readonly
                :cancel="false"
              ></Rating>
            </div>
            <div class="flex align-items-center justify-content-between">
              <span class="text-2xl font-semibold">${{ slotProps.data.price }}</span>
              <Button
                v-if="verifiAdded(slotProps.data)"
                icon="pi pi-shopping-cart"
                rounded
                @click="addToCart(slotProps.data)"
              ></Button>
              <Button v-else icon="pi pi-check" rounded @click="productAdded()"></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import "primeflex/primeflex.css";
import { getAllProducts } from "./getAllProducts.js";
import { getCategories } from "./getCategories.js";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";

export default {
  components: {

  },
  setup() {
    const products = ref(null);
    const totalProducts = ref(null);
    const selectedCategory = ref(null);
    const categories = ref(null);
    const search = ref(null);
    const layout = ref("grid");
    const toast = useToast();
    const store = useStore();

    //Functions to load and filter the information
    async function getInfo() {
      const response = await getAllProducts();
      if (!response) {
        toast.add({
          severity: "error",
          summary: "There was an error loading the information",
          life: 3000,
        });
        return;
      }
      if (!totalProducts.value) {
        totalProducts.value = response;
      }
      products.value = response;
    }

    async function getCat() {
      const response = await getCategories();
      categories.value = response;
    }
    
    async function searchProductsCategory() {
      products.value = [];
      const response = await getAllProducts(selectedCategory.value);
      if (!response) {
        toast.add({
          severity: "error",
          summary: "There was an error loading the information",
          life: 3000,
        });
        return;
      }
      totalProducts.value = response;
      products.value = response;
    }

    watch(search, () => {
      products.value = totalProducts.value.filter((e) => {
        return e.title.toLowerCase().includes(search.value.toLowerCase());
      });
    });

    onMounted(getInfo(), getCat());

    //Funtions for work to the store
    function addToCart(item) {
      store.commit("addProductToCart", { item });
      toast.add({
        severity: "success",
        summary: "Product was added successfully",
        life: 3000,
      });
    }

    const lenProducts = computed(() => store.getters["lenProducts"]);
    const idsProducts = computed(() => store.getters["idsProducts"]) || [];

    function verifiAdded(item) {
      return !idsProducts.value.includes(item.id);
    }

    function productAdded() {
      toast.add({
        severity: "info",
        summary: "This product was added to shopping cart",
        life: 3000,
      });
    }

    return {
      products,
      selectedCategory,
      categories,
      search,
      layout,
      searchProductsCategory,
      addToCart,
      lenProducts,
      idsProducts,
      verifiAdded,
      productAdded,
    };
  },
};
</script>

<style></style>
