import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {productServices} from "../../Services";


const initialState = {
    products: null,
    localUpdate:null,
}

const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async () => {
        const {data} = await productServices.getAllProducts();
        console.log(data)
        return data;


    }
);
const deleteProduct = createAsyncThunk(
    'productSlice/deleteProduct',
    async ({id}, {dispatch, rejectWithValue}) => {
        await productServices.deleteById(id)
        dispatch(deleteByIdLocal({id}))

    }
);

const updateProduct = createAsyncThunk(
    'productSlice/updateProduct',
    async ({product}, {dispatch, rejectWithValue}) => {
        const {data} = await productServices.updateProduct(product,product.id)
        dispatch(updateLocal({product:data}))

    }
);


const addNewProduct = createAsyncThunk(
    'productSlice/addNewProduct',
    async ({newProduct}, {dispatch, rejectWithValue}) => {
        try {
            const {data} = await productServices.addProduct(newProduct);
            dispatch(create({product: data}))
        } catch (e) {
            return rejectWithValue({status: e.message, formErrors: e.response.data})
        }


    }
);


const productsSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        create: (state, action) => {
            state.products.push(action.payload.product);
        },
        deleteByIdLocal: (state, actions) => {
            const {id} = actions.payload;
            const index = state.products.findIndex((product=>product.id===id));
            state.products.splice(index, 1);
        },
        updateLocal:(state,actions)=>{
            const {product} = actions.payload;
            const id = product.id
            const index = state.products.findIndex((product=>product.id===id));
            state.localUpdate= product
            state.products[index]=product

        }
    },
    extraReducers: ((builder) => {
        builder
            .addCase(getAllProducts.fulfilled, (state, actions) => {
                const products = actions.payload;
                // products.sort((a, b) => a.name.localeCompare(b.name));
                // state.products = products.sort((a, b) => a.count - b.count);
                state.products = products;
            })
    })
});
const {reducer: productsReducer, actions: {create, deleteByIdLocal,updateLocal}} = productsSlice;
const productsActions = {
    getAllProducts,
    addNewProduct,
    deleteProduct,
    updateProduct,
}
export {productsReducer, productsActions}