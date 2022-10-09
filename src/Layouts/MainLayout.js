import React from 'react';
import classes from "./MainLayout.module.css";
import {NavLink, Outlet} from "react-router-dom"

const MainLayout = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.bar}>
                <div className={classes.rout}>
                    <NavLink to={'products'}>Products</NavLink>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export {MainLayout};