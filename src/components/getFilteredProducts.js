import axios from "axios";

export const getFilteredProducts = async (category, title) => {
  try {
    let link = ''
    if (category){
      link=`https://fakestoreapi.com/products/category/${category}`
    }else{
      link='https://fakestoreapi.com/products'
    }

    const response = await axios.get(`${link}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null; // Puedes manejar el error de acuerdo a tus necesidades
  }
};