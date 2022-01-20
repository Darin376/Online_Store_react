import React from 'react';
import { Typography, CardContent, CardMedia, Button } from '@material-ui/core';
import { CardActionArea } from '@mui/material';
import { handleRemoveFromCart, handleUpdateCartQty } from '../../../Redux/Products/actions';
import { useDispatch } from 'react-redux';
import "../Cart.scss";

const CartItem = ({ item }) => {
  
    const dispatch = useDispatch();
    const handleUpdateCartQty2 = (lineItemId, newQuantity) => dispatch(handleUpdateCartQty(lineItemId, newQuantity));
    const handleRemoveFromCart2 = (lineItemId) => dispatch(handleRemoveFromCart(lineItemId));

    return (
        <div className='cartItemContainer'>
            <div className='cartItemActionContainer'>
                    <div className='cartImgWrapper'>
                    < img src={item.image.url} className='catrItemImg'/>
                    </div>
                <div >
                    <Typography variant="h6" >{item.name}</Typography>
                    <Typography variant="h5"  >{item.line_total.formatted}.р</Typography>
                </div>
            </div>
            <div className='cartItemContainerButton'>
                <div>
                    <Button size="small" color="secondary" variant="contained" onClick={() => handleUpdateCartQty2(item.id, item.quantity - 1)}>-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button size="small" variant="contained" onClick={() => handleUpdateCartQty2(item.id, item.quantity + 1)}>+</Button>
                </div>
                <div className='cartItemRemoveCart'>
                    <Button size="small" color="secondary" variant="contained" onClick={() => handleRemoveFromCart2(item.id)}>удалить из корзины</Button>
                </div>
            </div>
        </div >
    );
};
export default CartItem;