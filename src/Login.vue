<template>
  <toast />
  <CreateUser :showDialog="showDialog" @cancelCreation="showDialog = false"></CreateUser>
  <div class="card flex align-items-center justify-content-center">
    <Card style="width: 25em">
      <template #header>
        <img
          alt="user header"
          style="width: 25rem"
          src="https://primefaces.org/cdn/primevue/images/usercard.png"
        />
      </template>
      <template #title> Inicio de sesion </template>
      <template #content>
        <div v-if="state == 'login'">
          <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <label class="w-6rem">Nombre de usuario</label>
            <InputText id="username" v-model="username" type="text" class="w-12rem" />
          </div>
          <div
            class="mt-2 flex flex-wrap justify-content-center align-items-center gap-2"
          >
            <label class="w-6rem">Contraseña</label>
            <InputText id="password" v-model="password" type="password" class="w-12rem" />
          </div>
        </div>

        <div class="mt-5 flex flex-wrap justify-content-center align-items-center gap-2s">
          <Button
            label="Iniciar Sesion"
            @click="loginUserPost()"
            icon="pi pi-user"
            class="w-10rem mr-1"
          ></Button>
          <p>ó</p>
          <Button
            label="Registrar"
            @click="showDialog = true"
            icon="pi pi-user"
            class="w-10rem ml-1"
          ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { loginUser } from "./components/loginUser.js";
import CreateUser from "./components/createUser.vue";
import Card from "primevue/card";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    Card,
    CreateUser,
  },
  setup() {
    let username = ref("");
    let password = ref("");
    let showDialog = ref(false);
    let state = ref("login");
    const router = useRouter();
    const store = useStore();
    const toast = useToast();

    async function loginUserPost() {
      let user = {
        username: username.value.toLowerCase(),
        password: password.value,
      };
      const response = await loginUser(user);
      if (!response) {
        toast.add({
          severity: "error",
          summary: "Usuario o contraseña incorrectos",
          life: 3000,
        });
        return;
      }
      store.commit("updateName", { response });
      router.push("/store");
    }

    return {
      loginUserPost,
      username,
      password,
      state,
      showDialog,
    };
  },
};
</script>
