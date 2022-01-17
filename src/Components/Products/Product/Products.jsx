import * as React from 'react';
import { Link } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleAddToCart } from '../../../Redux/actions';
import { ShoppingCart } from "@material-ui/icons";
 
import "./ProductsStyle.scss";
export const Products = ({ product, productName }) => {

    const dispatch = useDispatch();
    const bottonHandleAddToCart = () => {
        dispatch(handleAddToCart(product.id, 1))
    }
    let productsInfoPath = `${product.id}`;
    
    return (
        <div className='productsWrapper' >
           <span className='productsWrapperSpan'>{productName}</span>
           <div className='productsImgWrapper'>
           <CardActionArea>
                <img src={product.image.url} className='productsImg' />
            </CardActionArea>
           </div>
           <div className='productsProductName'>
           <CardContent >
                <Typography className="title" variant="h6">
                    {product.name}
                </Typography>
            </CardContent>
           </div>
           <div className='productsLinkWrapper'>
           <Link className='productsLink' to={productsInfoPath}  >Информация о товарe </Link>
            <CardActions>
                <Typography gutterBottom variant="h5">
                    {product.price.formatted}.р
                </Typography>
            </CardActions>
           </div>
            <div  className='productsButtonWrapper' >
                <button className='productsBotton' onClick={bottonHandleAddToCart}>
                    <ShoppingCart />Добавить в корзину
                </button>
            </div>
        </div >
    )
}