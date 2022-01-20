import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { handleEmptyCart } from '../../Redux/Products/actions';
import "./Cart.scss";
import Spinner from '../../Spinner/spinner';

export const Cart = () => {
    const cartObj = useSelector((state) => {
        const { CartReduser } = state;
        return CartReduser.cart
    });

    const dispatch = useDispatch();
    const handleEmptyCart2 = () => dispatch(handleEmptyCart());

    const renderEmptyCart = () => (
        <div className='cartRenderEmptyCart'>
            <Typography variant="h4"  >Корзина пуста</Typography>
            <Link to="/" style={{ color: 'red', padding: '30px', fontSize: '25px' }}>Вернуться в главное меню</Link>
        </div>
    );

    if (!cartObj.line_items) return <Spinner/>

    const renderCart = () => (
        <>
            <div className='cartContainer' >
                <div className='cartWrapperContent'>
                    {cartObj.line_items.map((lineItem) => (
                        <div className='cartWrapperItem' key={lineItem.id}>
                            <CartItem item={lineItem} />
                        </div>
                    ))}
                </div>
                <div style={{ padding: '50px 0px 0px 50px' }}>
                    <div >
                        <Typography variant="h4">Общая стоимость: {cartObj.subtotal.formatted}.р</Typography>
                    </div>
                    <div className='cartButtonWrapper'>
                        <div style={{ padding: '15px', }}><Button size="large" variant="contained" color="secondary" onClick={handleEmptyCart2}>удалить все</Button></div>
                        <div style={{ padding: '15px', }} ><Button component={Link} to="/checkout" size="large" variant="contained" color="primary">купить</Button></div>
                    </div>
                </div>
            </div>
        </>
    );
    return (
        <div className='CartWrapper'>
            <div >
                <Typography variant="h3">Твоя корзина:</Typography>
            </div>
            {!cartObj.line_items.length ? renderEmptyCart() : renderCart()}
        </div>
    );
};