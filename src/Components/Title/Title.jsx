import "./TitleStyle.scss";
import { Link as Link1 } from 'react-scroll';
const Title = () => {

  return (
    <div className="site-title" id="header">  
            <div className="site-background" data-aos="fade-up" data-aos-delay="100">
                <h3>Путешествия & Велосипеды</h3>
                <h1>Выбери себе лучший велосипед</h1>
                <Link1 to='products'  smooth={true} duration={1000} >
                <button className="btn" >В категорию</button>
              </Link1> 
            </div>
    </div>
  );
};
export default Title;