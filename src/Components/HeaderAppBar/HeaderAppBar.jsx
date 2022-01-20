import React from "react";
import { useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSearchProducts } from '../../Redux/Products/actions';
import { useNavigate } from "react-router-dom";
import "./HeaderStyle.scss";
import LogoutIcon from '@mui/icons-material/Logout';
import {userLogin} from '../../Redux/user/userActions';
import {userLogout} from '../../Redux/user/userActions';
 
export const HeaderAppBar = () => {
    const dispatch = useDispatch();
    const [inputText, setInputText] = useState('');
    const [searchProducts, setSearchProducts] = useState({});
    const navigate = useNavigate();
    const pathname = () => navigate(1);
    const location = useLocation();


    const allInfo = useSelector((state) => {
        const { ProductsReducer,CartReduser,userReducer} = state;
        const allInfo = {
            total_items: CartReduser.cart.total_items,
            productsAll: ProductsReducer.productsAll,
            user:userReducer.user
        }
        return allInfo
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(userLogin());
      };
      const handleSubmitOut = (event) => {
        event.preventDefault();
        dispatch(userLogout());
      };
    
    let productsAll = { products: allInfo.productsAll }
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

    let CartColor = allInfo.total_items ? 'red' : '#c9d1d9';
    let searchLink = !inputText ? pathname : '/Search';
    const googleUser = (
        <div>
            {allInfo.user ? (
                <div className="UserAuth">
                     <div className="UserAuthName">
                     <img src={allInfo.user.photoURL} alt="imgLogin" />
                     <p>{allInfo.user.displayName} </p>
                     </div>
                    <div>
                    <LogoutIcon  className="headerLogout"   onClick={handleSubmitOut}/>
                    </div>
                </div>
            ) : (
                <button className='UserGoogleButton'  onClick={handleSubmit} >
                  Вход Google
                </button>
            )}
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
                                <Search style={{ fontSize: '30', cursor: 'pointer' }}
                                    onClick={() => !inputText ? notInputText() : handleClick(inputText)} />
                            </Link>
                        </div>
                    </div>
                )}
                <div className="headerRightWrapper">
                    <div className="headerLogoWrapper">
                    <Link to='/' >
                        <h3 className="headerLogo">Магазин велосипедов <span style={{ color: 'green' }} >Raptor</span></h3>
                    </Link>
                    </div>
                <div className="headerCenter">
                    {location.pathname !== '/checkout' && (
                    <div className="headerRight">
                        {googleUser}
                        <div className="headerMenuItem">
                            <Link to='/cart' style={{ color: CartColor }} >
                                <Badge badgeContent={allInfo.total_items} >
                                    <ShoppingCartOutlined style={{ fontSize: '30' }} />
                                </Badge>
                            </Link>
                        </div>
                    </div>
                )}
                </div>
                </div>
            </div>
        </div>
    );
};