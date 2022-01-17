import React from "react";
import "./Footer.scss";
import {
  Facebook,
  Instagram,
  Phone,
  Twitter,
} from "@material-ui/icons";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {  footerImgLeft,footerImgRight} from "../../Data/dataFooterInfo";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();
  return (
    <div className="footer" >
      <div className="container">
        <div className="about-us" data-aos="fade-right" data-aos-delay="200">
          <h2>О нас</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia atque nemo ad modi officiis
            iure, autem nulla tenetur repellendus.</p>
        </div>
        <div className="newsletter" data-aos="fade-right" data-aos-delay="200">
          <h2>Новостная рассылка</h2>
          <p>Укажите свой email</p>
          <div className="form-element">
            <input type="text" placeholder="Email" /><span> <ArrowRightAltIcon fontSize="large" /> </span>
          </div>
        </div>
        <div className="instagram" data-aos="fade-left" data-aos-delay="200">
          <h2>Instagram</h2>
          <div className="flex-row">
            {footerImgLeft.map((item,index)=> (
              <img src={item.img}alt={`insta1${index}`} key={item.id}/>
            ))}
          </div>
          <div className="flex-row">
          {footerImgRight.map((item,index)=> (
              <img src={item.img}alt={`insta1${index}`} key={item.id} />
            ))}
          </div>
        </div>
        <div className="follow" data-aos="fade-left" data-aos-delay="200">
          <h2>Подписывайся на наши группы</h2>
          <p>Давайте будем социальными</p>
          <ul className="network">
            <li><Facebook /></li>
            <li><Instagram /></li>
            <li><Phone /></li>
            <li><Twitter /></li>
          </ul>
        </div>
      </div>
      <div className="rights flex-row">
        <h4 className="text-gray">
          Copyright ©2021 All rights reserved | made by
          <a href="https://www.youtube.com/channel/UCIYZnwvHEfDQNBg9_GWk5oA" target="_black">DiZeLiSt 
            Channel</a>
        </h4>
      </div>{location.pathname === '/' && (
      <div className="move-up">
      <a href='#header' >
        <span><ArrowUpwardIcon sx={{ fontSize: 45 }} /> </span>
      </a>
    </div>
      )}
 
    </div>
  );
};
 