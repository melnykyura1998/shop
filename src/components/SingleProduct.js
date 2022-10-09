import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import classes from "./SingleProduct.module.css";
import {Comment} from "./Comment";
import {AddProductForm} from "./AddProductForm";
import {productsActions} from "../Redux";

const SingleProduct = () => {

    let {state: product} = useLocation();
    const {localUpdate} = useSelector(state => state.products);
    const [commentInput, setCommentInput] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const dispatch = useDispatch();


    if (localUpdate && localUpdate.id === product.id) {
        product = localUpdate;
    }

    const addComment = async () => {
        product = {
            ...product,
            comments: [{
                id: product.id,
                productId: product.id,
                description: commentValue,
                date: new Date()
            }]
        }
        await dispatch(productsActions.updateProduct({product}));
        setCommentValue('');
    }

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <div>{product.name}</div>
                <img src={product.imageURL
                } alt={`iamge ${product.name}`}/>
                <div>count: {product.count}</div>
                <div>size: {product.size}</div>
                <div>weight: {product.weight}</div>
            </div>
            <AddProductForm productForUpdate={product}/>
            <button onClick={() => setCommentInput(true)} className={classes.button}>add comment</button>
            {commentInput ? <div>
                <input className={classes.input} type="text" onChange={(e) => setCommentValue(e.target.value)}/>
                <button onClick={addComment} className={classes.button}>add</button>
            </div> : ''}
            {
                product.comments ? product.comments.map(comment =>
                    <Comment key={comment.id}
                             comment={comment}
                             product={product}
                    />
                ) : ""
            }
        </div>
    );
};

export default SingleProduct;