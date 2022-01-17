import "./MainSliderStyle.scss";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination";
import "swiper/swiper-bundle.min.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination } from "swiper";
import { useSelector } from 'react-redux';
import Spinner from "../../Spinner/spinner";

AOS.init();
SwiperCore.use([Pagination]);

export const MainSliderStyle = ()=> {
    const categories = useSelector((state) => {
        const { ProductsReducer } = state;
        return ProductsReducer.categoriesProducts
    });
    if(!categories.length)return <Spinner/>
    return (
        <div className="MainSwipercontainer">
        <Swiper breakpoints={{
            460: {
                slidesPerView: 1,
            },
            900: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1300: {
                slidesPerView: 3,
                spaceBetween: 90
            }
        }} pagination={{
            "clickable": true
        }} className="mainSwiper">
            {categories.map((item) => (
                <SwiperSlide key={item.id}  >
                   <div className="wrapperSwiperSliderImg" >
                     <img src={item.assets[0].url}/>
                    </div>
                    <div className="wrapperSwiperSliderBtn" >
                        <div className="itemNameWrapper">
                            <div className="itemName">{item.name}</div>
                            <span>{item.description}</span>
                        </div>
                        <Link to={item.slug}>
                            <button className="btn">Каталог</button>
                        </Link>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div >
    )
}