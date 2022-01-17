import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import "../SitecontentStyle.scss";  
 
export const Post = ({ item, index }) => {
    return (<>
        <div className="post-content" data-aos="zoom-in" data-aos-delay={100*(1+index)}>
            <div className="post-image">
                <div>
                    <img src={item.img}className="img" alt={`blog${index}`} />
                </div>
                <div className="post-info flex-row"  >
                    <PersonIcon />
                    <span>{item.role}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <EventNoteIcon /> <span>{item.data}</span> <span>{item.commentsCount}</span>
                </div>
            </div>
            <div className="post-title"  >
                <a href="#"> {item.linkInfo}:</a>
                <p>{item.postsInfo}:
                </p>
                <button className="btn post-btn">{item.postBtnInfo} &nbsp;</button>
            </div>
        </div>
        <hr />
    </>)
};