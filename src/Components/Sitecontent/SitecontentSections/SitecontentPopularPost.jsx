import "../SitecontentStyle.scss";  
import EventNoteIcon from '@mui/icons-material/EventNote';
 
export const PopularPost = ({ item, index }) => {
    return (<>
        <div className="post-content" data-aos="flip-up" data-aos-delay={100*(1+index)}>
            <div className="post-image">
                <div>
                    <img src={item.img} className="img"  alt={`blog${index}`} />
                </div>
                <div className="post-info flex-row">
                    <EventNoteIcon /> <span> {item.date}</span>
                    <span>{item.commentsCount}</span>
                </div>
            </div>
            <div className="post-title">
                <a href="#">{item.commentsText}</a>
            </div>
        </div>
    </>)
}