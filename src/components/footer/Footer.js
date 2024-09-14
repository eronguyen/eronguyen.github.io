import React from "react";
import "./Footer.css";
import { Fade } from "react-reveal";
import { greeting } from "../../portfolio.js";
// import ToggleSwitch from "./ToggleSwitch";
/* eslint-disable jsx-a11y/accessible-emoji */

export default function Footer(props) {
  return (
    <div className="footer-div">
      <Fade>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          Made with <span role="img">❤️</span> by {greeting.title}
        </p>
        <p className="footer-text" style={{ color: props.theme.secondaryText }}>
          Adapted from the{" "}
          <a href="https://github.com/ashutosh1919/masterPortfolio">
            Master Portfolio
          </a>
        </p>
        {/* <ToggleSwitch theme={props.theme} onToggle={props.onToggle}/> */}
      </Fade>
    </div>
  );
}
