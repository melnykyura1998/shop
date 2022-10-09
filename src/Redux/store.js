import {combineReducers, configureStore} from "@reduxjs/toolkit";


import {productsReducer} from "./productsSlice/productsSlice";

const rootReducer = combineReducers({
       products: productsReducer
});

export const store = configureStore({
    reducer:rootReducer
})