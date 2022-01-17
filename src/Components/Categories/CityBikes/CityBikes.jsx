import React, { useState, useEffect } from "react";
import Spinner from "../../../Spinner/spinner";
import { pagesObgProducts } from "../../../Data/sortProductsPrise";
import { useSelector } from "react-redux";
import { CategoriesInfo } from "../CategoriesInfo";

export const CityBikes = () => {
    const [sityBikes, setsityBikes] = useState([]);

    const AllProductsMass = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.categoriesProducts
    });
    useEffect(() => {
        if (!AllProductsMass.length) {
            return
        } else {
            setsityBikes(pagesObgProducts(AllProductsMass[1].productsData))
        }
    }, [AllProductsMass.length]);

    if (!sityBikes.productsNew) return <Spinner />;

    return (
        <CategoriesInfo Bikes={sityBikes} setBikes={setsityBikes} />
    );
};