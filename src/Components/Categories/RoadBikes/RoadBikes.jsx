import React, { useState, useEffect } from "react";
import Spinner from "../../../Spinner/spinner";
import { useSelector } from "react-redux";
import { pagesObgProducts } from "../../../Data/sortProductsPrise";
import { CategoriesInfo } from "../CategoriesInfo";

export const RoadBikes = () => {
    const [roadBikes, setRoadBikes] = useState({});
    const AllProductsMass = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.categoriesProducts
    });

    useEffect(() => {
        if (!AllProductsMass.length) {
            return
        } else {
            setRoadBikes(pagesObgProducts(AllProductsMass[2].productsData))
        }
    }, [AllProductsMass.length]);

    if (!roadBikes.productsNew) return <Spinner />;

    return (
        <CategoriesInfo Bikes={roadBikes} setBikes={setRoadBikes} />
    );
};