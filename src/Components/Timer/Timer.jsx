import React, { useState, useEffect } from "react";
import {timerData} from "../../Data/timerData";
import { Link as Link1 } from 'react-scroll';
import "./TimerStyle.scss";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
export const Timer = () => {
    const data = timerData.data;
    const [day, setday] = useState();
    const [hours, setclock] = useState();
    const [minutes, setminutes] = useState();
    const [seconds, setseconds] = useState();
    let countDate = new Date(`${data}`).getTime();

    let now = new Date().getTime();
    let gap = countDate - now;
    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let dayShop = hour * 24;
    let d = Math.floor(gap / (dayShop));
    let h = Math.floor((gap % (dayShop)) / (hour));
    let m = Math.floor((gap % (hour)) / (minute));
    let s = Math.floor((gap % (minute)) / (second));

    useEffect(() => {
        let myInterval = setInterval(() => {
            setday(d)
            setclock(h)
            setminutes(m)
            setseconds(s)
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });
  
    return (
        <div className="tiimer" id="deal"  data-aos="fade-right">
            <div className="content">
                <h3 className="title">Осталось времени до скидки месяца</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam possimus voluptates commodi laudantium! Doloribus sint voluptatibus quaerat sequi suscipit nulla?</p>
                <div className="count-down">
                    <div className="box" data-aos="flip-up" data-aos-delay="200">
                        <h3 id="day">{day}</h3>
                        <span>Дней</span>
                    </div>
                    <div className="box" data-aos="flip-up" data-aos-delay="300">
                        <h3 id="hour">{hours}</h3>
                        <span>Часов</span>
                    </div>
                    <div className="box" data-aos="flip-up" data-aos-delay="400">
                        <h3 id="minute">{minutes}</h3>
                        <span>Минут</span>
                    </div>
                    <div className="box" data-aos="flip-up" data-aos-delay="500">
                        <h3 id="second">{seconds}</h3>
                        <span>Секунд</span>
                    </div>
                </div>
                <Link1 to='products' smooth={true} duration={1000}>
                    <button className="Btn" >Узнать информацию</button>
                </Link1>
            </div>
        </div>
     
    );
};
 