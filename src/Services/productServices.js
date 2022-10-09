import {axiosServises} from "./axiosServises";
import {urls} from "../constants";

export const productServices = {
    getAllProducts:()=>axiosServises(`${urls.products}`),
    updateProduct:(product,productId)=>axiosServises.put(`${urls.products}/${productId}`,product),
    addProduct:(product)=>axiosServises.post(urls.products,product),
    deleteById: (id) => axiosServises.delete(`${urls.products}/${id}/`)

}