import React, { useEffect, useState } from "react";
import { Products } from "../Products/Product/Products";
import { Button } from "@material-ui/core";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";
import "./Categoriex.scss";
import { priceSortingLess, priceSortingMore, pagesObgProducts } from "../../Data/sortProductsPrise";
 
export const CategoriesInfo = ({ Bikes, setBikes }) => {
    const [pagesAll, setPagesAll] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pagesAll]);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div className="categoriesContainer">
            <div className="categoriesWrapper">
                <div className="categoriesInfo">
                    <div className="CategoriesSortPrise">
                        <span>Сортировка по цене:</span>
                        <ExpandMoreIcon style={{ fontSize: '50', color: 'green', cursor: 'pointer' }} onClick={() => { setBikes(pagesObgProducts(priceSortingLess(Bikes))) }} />
                        <ExpandLessIcon style={{ fontSize: '50', color: 'red', cursor: 'pointer' }} onClick={() => { setBikes(pagesObgProducts(priceSortingMore(Bikes))) }} />
                    </div>
                    <div className="categoriesProduct">
                        {Bikes.productsNew[pagesAll - 1].map((product, index) => (
                            <div className="categoriesProductDetail" key={product.id}>
                                <Products product={product} productName={product.sku} />
                            </div>))}
                    </div>
                    <div className="CategoriesPagesWrapper">
                        {Bikes.quantityPages.map((p, index) => {
                            return <span key={index} className={pagesAll === p ? "CategoriesPagesActiv" : "CategoriesPages"} onClick={() => { setPagesAll(p) }}>{p}</span>
                        })}
                    </div>
                    <div className="categoriesReturn">
                        <Button size="large" variant="contained" color="secondary" onClick={goBack}>
                            <div style={{ fontSize: '14px' }}> Вернуться назад</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}