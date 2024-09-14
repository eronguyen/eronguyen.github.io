import React, { Component } from "react";
import "./Publications.css";
import PublicationCard from "../../components/publicationCard/PublicationCard.js";
import { publications } from "../../portfolio.js";
import { Fade } from "react-reveal";

class Publications extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="main" id="publications">
        <div className="">
          <Fade bottom duration={2000} distance="20px">
            <h1 className="publications-header" style={{ color: theme.text }}>
              Publications
            </h1>
          </Fade>
        </div>
        <div className="publications-body-div">
          {publications.data.map((publication) => {
            return <PublicationCard publication={publication} theme={theme} />;
          })}
        </div>
      </div>
    );
  }
}

export default Publications;
