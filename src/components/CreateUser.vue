<template>
  <div class="card flex justify-content-center">
    <Dialog
      :visible="showDialog"
      modal
      header="Crear Usuario"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      :closable="false"
    >
      <div class="flex flex-wrap justify-content-center align-items-center gap-2">
        <label class="w-6rem">Nombre de usuario</label>
        <InputText id="username" v-model="username" type="text" class="w-12rem" />
      </div>
      <div class="mt-2 flex flex-wrap justify-content-center align-items-center gap-2">
        <label class="w-6rem">Nombre</label>
        <InputText id="username" v-model="name" type="text" class="w-12rem" />
      </div>
      <div class="mt-2 flex flex-wrap justify-content-center align-items-center gap-2">
        <label class="w-6rem">Contraseña</label>
        <InputText id="password" v-model="password" type="password" class="w-12rem" />
      </div>
      <div class="mt-5 flex flex-wrap justify-content-center align-items-center gap-2s">
        <Button
          label="Cancelar"
          @click="closeModal()"
          icon="pi pi-user"
          class="w-10rem ml-1"
          severity="danger"
        ></Button>
        <Button
          label="Registrar"
          @click="create()"
          icon="pi pi-user"
          class="w-10rem ml-1"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Card from "primevue/card";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import { createUser } from "./createUser.js";
export default {
  props: {
    showDialog: Boolean,
  },
  components: {
    Card,
    Dialog,
  },
  setup(props, { emit }) {
    let username = ref("");
    let name = ref("");
    let password = ref("");

    const toast = useToast();

    function closeModal() {
      emit("cancelCreation", true);
    }

    function create() {
      if (username.value === "" || name.value === "" || password === "") {
        toast.add({
          severity: "error",
          summary: "Ingrese todos los campos",
          life: 3000,
        });
        return;
      }
      createUserPost();
    }

    async function createUserPost() {
      let user = {
        username: username.value.toLowerCase(),
        name: name.value.toLowerCase(),
        password: password.value,
      };
      const response = await createUser(user);
      console.log(response);
      if (!response) {
        toast.add({
          severity: "error",
          summary: "Error al crear el usuario",
          life: 3000,
        });
        return;
      }
      if (response == "Nombre existente") {
        toast.add({
          severity: "warn",
          summary: "Usuario Existente",
          life: 3000,
        });
        return;
      }

      toast.add({
        severity: "success",
        summary: "Usuario Creado Correctamente",
        life: 3000,
      });
      emit("cancelCreation", true);
    }

    return {
      createUserPost,
      username,
      password,
      name,
      closeModal,
      create,
    };
  },
};
</script>
