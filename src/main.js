import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css'
import "primeicons/primeicons.css";
import ToastService from 'primevue/toastservice';
import Button from "primevue/button";
import DataView from "primevue/dataview";
import Rating from "primevue/rating";
import Tag from "primevue/tag";
import ProgressSpinner from "primevue/progressspinner";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Toast from "primevue/toast";
import Card from "primevue/card";
import Sidebar from "primevue/sidebar";

const app = createApp(App);

app.use(store);
app.use(PrimeVue);
app.use(ToastService);

app.component('Button', Button);
app.component('DataView', DataView);
app.component('Tag', Tag);
app.component('ProgressSpinner', ProgressSpinner);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('InputText', InputText);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Toast', Toast);
app.component('Card', Card);
app.component('Dropdown', Dropdown);
app.component('Sidebar', Sidebar);

app.mount('#app');