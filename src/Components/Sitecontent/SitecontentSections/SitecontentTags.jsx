import "../SitecontentStyle.scss";  

export const Tags = ({ item, index }) => {
    return (<>
        <span className="tag" data-aos="flip-up" data-aos-delay={100*(1+index)}> {item.tagsText}</span>
    </>)
}