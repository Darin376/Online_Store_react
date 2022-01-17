import { useSelector } from 'react-redux';
import { Products } from "../Product/Products";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./SearchProductsStyle.scss"
 
const NotSearchFile = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <div style={{ textAlign: "center", color: 'red', paddingTop: '100px', height: '65vh' }}>
            <h3 style={{ fontSize: '30px', margin: '30px' }}>Поиск не дал  результата!</h3>
            <Button size="large" variant="contained" color="secondary" onClick={goBack}>
                <div style={{ fontSize: '14px' }}> Вернуться назад</div>
            </Button>
        </div>
    )
}

export const SearchProducts = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const productQuantity = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.searchProducts
    });
    
    if (!productQuantity.length) return <NotSearchFile/>;
    return (
     
        <div className='searchProductsContainer'>
            <div className='searchProductsWrapper'>
                <div className='searchProductsInfo'>
                    <div className='searchProductsProduct'>
                        {productQuantity.map((product) => (
                            <div className='searchProductsProductDetail' key={product.id} >
                                <Products product={product} productName={product.sku} />
                            </div>
                        ))}
                    </div>
                    <div className='searchProductsReturn'>
                        <Button size="large" variant="contained" color="secondary" onClick={goBack}>
                            <div style={{ fontSize: '14px' }}> Вернуться назад</div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
 
    );
};