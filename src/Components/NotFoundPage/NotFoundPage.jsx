import { Link } from "react-router-dom";
import "./NotFoundPageStyle.scss";

export const NotFoundPage = () => {
    return (
        <div  className="notFoundPageWrapper">
            <h3>Страница не найдена </h3>
            <Link to="/">Вернуться в меню</Link>
        </div>
    )
}