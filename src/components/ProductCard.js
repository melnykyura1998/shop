import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import classes from "./ProductCard.module.css";
import {productsActions} from "../Redux";


const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const remove = async () => {
        await dispatch(productsActions.deleteProduct({id: product.id}));
    }

    const toProduct = () => {
        const productId = product.id;
        navigate(productId.toString(), {state: product});
    }

    return (
        <div>
            <div className={classes.wrapper} onClick={toProduct}>
                <img className={classes.img} src={product.imageUrl} alt={`${product.name} image`}/>
                <div className={classes.buttons}>
                    <div className={classes.name}>{product.name}</div>

                </div>
            </div>
            <button className={classes.buttonClose} onClick={remove}>delete</button>
        </div>
    );
};

export {ProductCard};