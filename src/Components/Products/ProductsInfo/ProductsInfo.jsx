import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { commerce } from "../../../DataBase/commerce";
import { ShoppingCart } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { Button } from "@material-ui/core";
import Spinner from "../../../Spinner/spinner";
import { handleAddToCart } from "../../../Redux/actions";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import "swiper/swiper.min.css";
import "swiper/modules/effect-cube/effect-cube";
import "swiper/modules/pagination/pagination";
import "./ProductsInfoStyle.scss";

import SwiperCore, {
    EffectCube, Pagination
} from 'swiper';

SwiperCore.use([EffectCube, Pagination]);

const createMarkup = (text) => {
    return { __html: text };
};
export const ProductsInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
 
    const dispatch = useDispatch();
    const handleAddToCart2 = () => {
        dispatch(handleAddToCart(product.id, quantity))
    }
    const fetchProduct = async (id) => {
        const response = await commerce.products.retrieve(id);
        const { name, price, image, quantity, description, assets } = response;

        setProduct({
            id,
            name,
            quantity,
            description,
            src: image.url,
            price: price.formatted,
            imageMass: assets
        });
    };

    useEffect(() => {
        fetchProduct(id)
    }, []);

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const handleQuantity = (param) => {
        if (param === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
        if (param === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    if (!product.imageMass) return <Spinner />;
    return (

        <div className="ProductsInfoWrapper">
            <div className="ProductsInfoLeft">
                <Swiper effect={'cube'} grabCursor={true} cubeEffect={{
                    "shadow": true,
                    "slideShadows": true,
                    "shadowOffset": 20,
                    "shadowScale": 0.94
                }} pagination={true} className="myCub">
                    {product.imageMass.map((imgProducts) => (
                        <SwiperSlide key={imgProducts.id}>
                            <img src={imgProducts.url} className="productsInfoImg" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="ProductsInfoRight">
                <p className="mainHeading">{product.name}</p>
                <p className="description" dangerouslySetInnerHTML={createMarkup(product.description)} />
                <div >
                    <div >
                        <div className="headingPrise"> Цена за велосипед:
                            <p style={{ color: 'green', paddingLeft: '10px' }}>{product.price}.р</p>
                        </div>
                    </div>
                    <div className="cartInfo">
                        <div >
                            <Button size="small" variant="contained" onClick={() => { handleQuantity("increase") }}>
                                +
                            </Button>
                        </div>
                        <div >
                            <div className="quantityProducts"  >
                                Количество: <p className="quantityProductsP"> {quantity}</p>
                            </div>
                        </div>
                        <div>
                            <Button size="small" color="secondary" variant="contained" onClick={() => { handleQuantity("decrease") }}>
                                -
                            </Button>
                        </div>
                    </div>
                    <div className="productsInfoWrapperButton" >
                        <div className="productsInfoReturn">
                            <Button size="large" variant="contained" color="secondary" onClick={goBack}>
                                <p className="productsInfoNameButton"> Вернуться назад</p>
                            </Button>
                        </div>
                        <Button size="large" variant="contained" onClick={handleAddToCart2}>
                            <ShoppingCart fontSize="small" /><p className="productsInfoNameButton"> Добавить в корзину </p>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}