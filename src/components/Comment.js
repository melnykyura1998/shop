import React from 'react';
import {useDispatch} from "react-redux";

import {productsActions} from "../Redux";
import classes from "./Comment.module.css";


const Comment = ({comment, product}) => {

    const dispatch = useDispatch();

    let {comments} = product;
    const {id} = comment;

    const deleteComment = async () => {
        const commentIndex = product.comments.findIndex((comment => comment.id === id));
        console.log(comments);
        comments.splice(commentIndex, 1);
        const updatedProduct = {...product, comments: comments};
        await dispatch(productsActions.updateProduct({product: updatedProduct}));
    }

    return (
        <span className={classes.comment}>
            <p>{comment.description}</p>
            <button onClick={deleteComment}>delete</button>
        </span>


    );
};

export {Comment};