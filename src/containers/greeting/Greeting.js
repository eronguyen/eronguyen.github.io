import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";
import { greeting } from "../../portfolio";
import { Fade, Flip } from "react-reveal";

export default function Greeting(props) {
  const theme = props.theme;
  return (
    <Fade bottom duration={2000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text" style={{ color: theme.text }}>
                {greeting.title}
              </h1>
              {greeting.nickname && (
                <h2 className="greeting-nickname" style={{ color: theme.text }}>
                  Call me <a className="fancy-link2">{greeting.nickname}</a> if
                  you like!
                </h2>
              )}
              <p
                className="greeting-text-p subTitle"
                style={{ color: theme.secondaryText, fontSize: "100%" }}
              >
                {greeting.subTitle}
              </p>
              <SocialMedia theme={theme} />
              <div className="portfolio-repo-btn-div">
                <Button
                  text="⭐ Check out my Resume ⭐"
                  newTab={true}
                  // href={greeting.resumeLink}
                  href="/resume.pdf"
                  theme={theme}
                  className="portfolio-repo-btn"
                />
              </div>
            </div>
          </div>
          <div
            className="greeting-image-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Flip left duration={2000}>
              <img
                style={{
                  width: "50%",
                  borderRadius: "50%",
                  padding: "10px",
                  border: "5px solid #d9dbdf",
                  boxShadow: "5px 5px 5px #d9dbdf",
                }}
                alt="avatar"
                src={require(`../../assets/images/me.png`)}
              />
            </Flip>
            <p>eronguyen[at]cs[dot]stonybrook[dot]edu</p>
            <p></p>
          </div>
        </div>

        <h1 className="skills-header" style={{ color: theme.text }}>
          News
        </h1>
        <p
          className="greeting-text-p subTitle"
          style={{ color: theme.secondaryText, fontSize: "100%" }}
        >
          <ul>
            <li>
              <b>Oct 28th, 2024:</b> My first paper{" "}
              <a
                href="https://nero1342.github.io/VATEX_RIS/"
                target="_blank"
                rel="noopener noreferrer"
                className="fancy-link"
              >
                VATEX
              </a>{" "}
              has been accepted to WACV 2025. This is my first time I co-first
              author in a top-tier CV conference. Cheers!!
            </li>
            <li>
              <b>Aug 26th, 2024:</b> I start my Ph.D at Stony Brook University.
            </li>
          </ul>
        </p>
      </div>
    </Fade>
  );
}
