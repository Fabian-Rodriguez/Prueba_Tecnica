import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export function authMiddleware(to, from, next) {
    const router = useRouter();
    const store = useStore();

    const userExists = store.getters["getName"]

    if (!userExists) {
        router.push('/login');
    } else {
        next();
    }
}