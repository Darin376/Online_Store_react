import React from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSearchProducts } from '../../Redux/actions';
import { useNavigate } from "react-router-dom";
import "./HeaderStyle.scss";

export const HeaderAppBar = () => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState('');
    const [searchProducts, setSearchProducts] = useState({});

    const navigate = useNavigate();
    const pathname = () => navigate(1);
    const location = useLocation();
    const productQuantity = useSelector((state) => {
        const { ProductsReducer,CartReduser } = state;
        const products = {
            total_items: CartReduser.cart.total_items,
            productsAll: ProductsReducer.productsAll
        }
        return products
    });

    let productsAll = { products: productQuantity.productsAll }

    const handleClick = (searchProduct) => {
        let products = searchProduct.toLowerCase()
        const filteredProducts = productsAll.products.filter(
            ({ name, sku }) =>
                name.toLowerCase().includes(products)
                || sku.toLowerCase().includes(products)
        );
        setSearchProducts(filteredProducts);
    }
    const notInputText = () => {
        alert('Введите название товара для поиска!!!')
    }
    useEffect(() => {
        dispatch(addSearchProducts(searchProducts))
    }, [searchProducts])

    let CartColor = productQuantity.total_items ? 'red' : '#c9d1d9';
    let searchLink = !inputText ? pathname : '/Search';


    const headerNone = (
        <div className="headerProfileIcon">
            {location.pathname !== '/checkout' && (
                <div className="headerProfileIconLeft">
                    <div className="headerProfileIconSearchContainer">
                        <input className="headerProfileIconInput"
                            placeholder="Поиск товаров Stels,Forward,Stinger,kaiman,Sven,Cona т.д"
                            type='text'
                            value={inputText}
                            onChange={((e) => setInputText(e.target.value))}
                        />
                        <Link to={searchLink} style={{ color: 'black' }} >
                            <Search style={{ fontSize: '36', cursor: 'pointer', paddingRight: '15px', }}
                                onClick={() => !inputText ? notInputText() : handleClick(inputText)} />
                        </Link>
                    </div>
                </div>
            )}
            <div className="headerProfileIconRight">
                <Link to='/' >
                    <h3 className="headerLogo">Магазин велосипедов <span style={{ color: 'green' }} >Raptor</span></h3>
                </Link>
                {location.pathname !== '/checkout' && (
                    <div className="headerMenuItem">
                        <AccountCircle sx={{ fontSize: 30 }} />
                        <Link to='/cart' style={{ color: CartColor, paddingLeft: '30px' }} >
                            <Badge badgeContent={productQuantity.total_items} >
                                <ShoppingCartOutlined style={{ fontSize: '30' }} />
                            </Badge>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
    return (
        <div className="headerContainer">
            <div className="headerWrapper">
                {location.pathname !== '/checkout' && (
                    <div className="headerLeft">
                        <div className="headerSearchContainer">
                            <input className="headerInput"
                                placeholder="Поиск товаров Stels,Forward,Stinger,kaiman,Sven,Cona т.д"
                                type='text'
                                value={inputText}
                                onChange={((e) => setInputText(e.target.value))}
                            />
                            <Link to={searchLink} style={{ color: 'black' }} >
                                <Search style={{ fontSize: '36', cursor: 'pointer' }}
                                    onClick={() => !inputText ? notInputText() : handleClick(inputText)} />
                            </Link>
                        </div>
                    </div>
                )}
                <div className="headerCenter">
                    <Link to='/' >
                        <h3 className="headerLogo">Магазин велосипедов <span style={{ color: 'green' }} >Raptor</span></h3>
                    </Link>
                </div>
                {location.pathname !== '/checkout' && (
                    <div className="headerRight">
                        <div className="headerMenuItemProfile">Профиль</div>
                        <div className="headerMenuItem">
                            <Link to='/cart' style={{ color: CartColor }} >
                                <Badge badgeContent={productQuantity.total_items} >
                                    <ShoppingCartOutlined style={{ fontSize: '30' }} />
                                </Badge>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            {headerNone}
        </div>
    );
};