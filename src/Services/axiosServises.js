import axios from "axios";
import baseURL from "../constants/urls";

export const axiosServises = axios.create({baseURL})
