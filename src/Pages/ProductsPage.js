import React from 'react';
import {Outlet, useLocation} from "react-router-dom";

import {Products} from "../components";
const ProductsPage = () => {

    const {pathname} = useLocation();

    return (
        <div>
            {
                pathname === '/products' ? <Products/> : <Outlet/>
            }
        </div>
    );
};

export {ProductsPage};