import React, { useEffect } from "react";
import { commerce } from './DataBase/commerce';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addProductsPerCategory, addedCart, addProducts } from "./Redux/Products/actions";
import { RoadBikes, MountainBikes, CityBikes,ChildrenBicycles,HybridBikes } from './Components/Categories';
import { NotFoundPage, MainMenu, HeaderAppBar, Cart, ProductsInfo, Footer, SearchProducts, Checkout } from './Components';
import "./app.css";
import ScrollToTop from "./ScrollToTop/scrollToTop";
import { Comments } from "./Components/Comments/Comments";
  
export const App = () => {
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const { data: products } = await commerce.products.list({
            limit: 50
        });
        dispatch(addProducts(products))
        const { data: categories } = await commerce.categories.list();
        const productsPerCategory = categories.reduce((acc, category) => {
            return [
                ...acc,
                {
                    ...category,
                    productsData: products.filter((product) =>
                        product.categories.find((cat) => cat.id === category.id)
                    ),
                },
            ];
        }, []);
        dispatch(addProductsPerCategory(productsPerCategory))
    };
    const fetchCart = async () => {
        const allCart = await commerce.cart.retrieve();
        dispatch(addedCart(allCart))
    };
    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <Router>
            <div className='app-wrapper'>
                <HeaderAppBar />
                <div className='app-wrapper-content'>
                    <ScrollToTop />
                    <Routes>
                        <Route path='/' element={<MainMenu />} />
                        <Route path='/CityBikes' element={<CityBikes />} />
                        <Route path='/CityBikes/:id' element={<ProductsInfo />} />
                        <Route path='/Childrenbicycles' element={<ChildrenBicycles />} />
                        <Route path='/childrenbicycles/:id' element={<ProductsInfo />} />
                        <Route path='/RoadBikes' element={<RoadBikes />} />
                        <Route path='/RoadBikes/:id' element={<ProductsInfo />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/MountainBikes' element={<MountainBikes />} />
                        <Route path='/MountainBikes/:id' element={<ProductsInfo />} />
                        <Route path='/Search' element={<SearchProducts />} />
                        <Route path='/Search/:id' element={<ProductsInfo />} />
                        <Route path='/Checkout' element={<Checkout />} />
                        <Route path='/Comments' element={ <Comments/>} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router >
    )
}