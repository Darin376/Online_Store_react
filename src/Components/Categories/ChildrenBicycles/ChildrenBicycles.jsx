import React, { useState, useEffect } from "react";
import Spinner from "../../../Spinner/spinner";
import { pagesObgProducts } from "../../../Data/sortProductsPrise";
import { useSelector } from "react-redux";
import { CategoriesInfo } from "../CategoriesInfo";

export const ChildrenBicycles = () => {
    const [childrenBicycles, setChildrenBicycles] = useState([]);
    const AllProductsMass = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.categoriesProducts
    });

    useEffect(() => {
        if (!AllProductsMass.length) {
            return
        } else {
            setChildrenBicycles(pagesObgProducts(AllProductsMass[0].productsData))
        }
    }, [AllProductsMass.length]);

    if (!childrenBicycles.productsNew) return <Spinner />;

    return (
        <CategoriesInfo Bikes={childrenBicycles} setBikes={setChildrenBicycles} />
    );
};