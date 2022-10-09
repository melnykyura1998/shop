import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import classes from "./AddProductForm.module.css";
import {productsActions} from "../Redux";


const AddProductForm = ({productForUpdate}) => {
    const {register, reset, handleSubmit, formState: {errors}, setValue} = useForm({
        mode: "onTouched"
    });
    const {products} = useSelector(state => state.products);
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();


    const getId = () => {
        let id = 1;
        if (products.length>0) {
             id = products[products.length-1].id +1;
        }
        return id;
    }


    useEffect(() => {
        if (productForUpdate) {
            const {name, size, count, imageURL, weight} = productForUpdate;
            setValue('name', name)
            setValue('size', size)
            setValue('count', count)
            setValue('imageURL', imageURL)
            setValue('weight', weight)
        }
    }, [productForUpdate])


    const cancel = () => {
        setOpen(false)
    }

    const mySubmit = async (data) => {
        try {
            if(productForUpdate){
                const changedProduct ={...productForUpdate,...data}
                await dispatch(productsActions.updateProduct({product:changedProduct}))

                reset()
            }else{
                const id = getId()
                const newProduct = {...data, id}
                console.log(newProduct)
                await dispatch(productsActions.addNewProduct({newProduct}))

                reset()
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <button className={classes.buttonAdd} onClick={() => setOpen(true)} disabled={isOpen}>
                {!productForUpdate? 'add product':"edit"}
            </button>
            {isOpen ? <div>
                <form onSubmit={handleSubmit(mySubmit)} className={classes.wrapper}>
                    <div><label>Name: <input type="text" {...register('name',{ required: true})}/></label></div>
                    <div><label>Size: <input type="text" placeholder={'200;200'} {...register('size',{ required: true})}/></label></div>
                    <div><label>Count: <input type="number" {...register('count', {valueAsNumber: true, required: true})}/></label>
                    </div>
                    <div><label>Image URL: <input type="text" {...register('imageURL',{ required: true})}/></label></div>
                    <div><label>Weight: <input type="number" {...register('weight',{valueAsNumber: true, required: true})}/></label></div>
                    {errors.year && <span>{errors.year.message}</span>}
                    <div>
                        <button className={classes.button}>confirm</button>
                    </div>
                </form>
                <button className={classes.buttonClose} onClick={cancel}>cancel</button>
            </div>:''}
        </div>
    );
};

export {AddProductForm};