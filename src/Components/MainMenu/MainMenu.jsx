import Sitecontent from "../Sitecontent/Sitecontent";
import Title from "../Title/Title";
import React from "react";
import { MainSliderStyle } from "../Slider/MainSliderStyle";
import { Timer } from "../Timer/Timer";
import "./MainStyle.scss";
export const MainMenu = () => {
    return (
        <div className="MainManuContainer"  >
            <Title />
            <MainSliderStyle/>
            <Sitecontent />
            <Timer />
        </div>
    );
};