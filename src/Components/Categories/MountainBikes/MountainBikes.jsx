import React, { useState, useEffect } from "react";
import Spinner from "../../../Spinner/spinner";
import { useSelector } from "react-redux";
import { pagesObgProducts } from "../../../Data/sortProductsPrise";
import { CategoriesInfo } from "../CategoriesInfo";

export const MountainBikes = () => {
    const [mountainBikes, setMountainBikes] = useState({});
    const AllProductsMass = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.categoriesProducts
    });

    useEffect(() => {
        if (!AllProductsMass.length) {
            return
        } else {
            setMountainBikes(pagesObgProducts(AllProductsMass[3].productsData))
        }
    }, [AllProductsMass.length]);

    if (!mountainBikes.productsNew) return <Spinner />;

    return (
        <CategoriesInfo Bikes={mountainBikes} setBikes={setMountainBikes} />
    );
};