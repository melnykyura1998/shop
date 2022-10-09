import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {productsActions} from "../Redux";
import {ProductCard} from "./ProductCard";
import classes from "./Products.module.css";
import {AddProductForm} from "./AddProductForm";

const Products = () => {
    const {products} = useSelector(state => state.products);
    const dispatch = useDispatch();

    const [productsData, setProductsData] = useState([]);
    useEffect(() => {
        dispatch(productsActions.getAllProducts())
    }, [])

    useEffect(() => {
        if (products) {
            setProductsData(products)
        }
    }, [products])


    return (
        <div className={classes.wrapper}>
            <AddProductForm/>
            <div className={classes.productsList}>
                {productsData.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        </div>
    );
};

export {Products};