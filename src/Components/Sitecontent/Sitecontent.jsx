import { useSelector } from "react-redux";
import { postInfo, popularPost, tags } from "../../Data/dataSitecontentInfo";
import "./SitecontentStyle.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Post, PopularPost, Tags } from './SitecontentSections';
import { Link as Link1 } from 'react-scroll';
import { Link} from 'react-router-dom';
AOS.init();

const Sitecontent = () => {

  const AllProductsMass = useSelector((state) => {
    const { ProductsReducer } = state;
    return ProductsReducer.categoriesProducts
  });

  return (
    <div className="SiteContentcontainer">
      <div className="site-content">
        <div className="posts">
          {postInfo.map((item, index) => (
            <Post item={item} index={index} key={item.id} />
          ))}
        </div>
        <aside className="sidebar" >
          <div className="category" id="products" >
            <h2>Категории</h2>
            <ul className="category-list">
              {AllProductsMass.map((product, item) => (
                <li className="list-items" data-aos="fade-left" data-aos-delay={item * 100} key={product.id}>
                  <Link to={product.slug}>{product.name}</Link>
                  <span>{!product.productsData.length ? 0 : product.productsData.length}</span>
                </li>
              ))}
            </ul>
            <Link to='/Comments'  >
              <button className="discountInfo" data-aos="fade-up" data-aos-delay={600}>
                <span>Оставить отзыв</span>
              </button>
            </Link>
            <Link1 to='deal'  smooth={true}duration={1000} >
              <button className="discountInfo" data-aos="fade-up" data-aos-delay={600}>
                <span>Узнать о скидке месяца</span>
              </button>
            </Link1>
          </div>
          <div className="popular-post">
            <h2>Популярные посты о нас</h2>
            {popularPost.map((item, index) => (
               <PopularPost item={item} index={index} key={item.id}/>
            ))}
          </div>
          <div className="newsletter" data-aos="fade-up" data-aos-delay="300">
            <h2>Новостная рассылка</h2>
            <div className="form-element">
              <input type="text" className="input-element" placeholder="Email" />
              <button className="btn form-btn">Подписаться</button>
            </div>
          </div>
          <div className="popular-tags">
            <h2>Популярные теги</h2>
            <div className="tags flex-row">
              {tags.map((item, index) => (
                <Tags item={item} index={index} key={item.id}/>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default Sitecontent;