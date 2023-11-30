import axios from "axios";

export const createUser = async (user) => {
    try {
        const response = await axios.post(`http://localhost:8000/create_user`, user, { withCredentials: true });
        return response.data
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return null; // Puedes manejar el error de acuerdo a tus necesidades
    }
};