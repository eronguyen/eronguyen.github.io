import React, { Component } from "react";
import "./PublicationCard.css";
import "./PublicationType.css";

import { Fade, Flip } from "react-reveal";

// Mapping of conference types to CSS classes and URLs
const conferenceClassMap = {
  arXiv: {
    className: "button arxiv-btn",
    link: "https://arxiv.org/",
  },
  NeurIPS: {
    className: "button neurips-btn",
    link: "https://nips.cc/",
  },
  CVPR: {
    className: "button cvpr-btn",
    link: "https://cvpr.thecvf.com/",
  },
  WACV: {
    className: "button wacv-btn",
    link: "https://wacv2025.thecvf.com/",
  },
  AAAI: {
    className: "button aaai-btn",
    link: "https://aaai.org/",
  },
  paper: {
    className: "button default-btn",
    link: "#",
  },
  MMM: {
    className: "button mmm-btn",
    link: "https://mmm2025.net/",
  },
  ICMR: {
    className: "button icmr-btn",
    link: "https://icmr2024.org/",
  },
  CVPRW: {
    className: "button cvprw-btn",
    link: "https://cvpr.thecvf.com/virtual/2024/events/workshop",
  },
  MediaEval: {
    className: "button mediaeval-btn",
    link: "https://multimediaeval.github.io/",
  },
  // Add more types as needed
};

class PublicationCard extends Component {
  render() {
    const publication = this.props.publication;
    const theme = this.props.theme;

    // Get the class and link from the map based on the publication type
    const conferenceData =
      conferenceClassMap[publication.type] || conferenceClassMap.paper;

    // Determine the button class and link dynamically

    return (
      <div className="publication-card">
        {publication.logo_path && (
          <Flip left duration={2000}>
            <div>
              <a
                href={conferenceData.link}
                target="_blank"
                rel="noopener noreferrer"
                className={conferenceData.className} // Dynamically assign the button class
                style={{ color: theme.text }}
              >
                {publication.type}
              </a>

              <div className="card2-img">
                <img
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                  src={require(`../../assets/images/${publication.logo_path}`)}
                  alt={publication.alt_name}
                />
              </div>
            </div>
          </Flip>
        )}
        <Fade right duration={2000} distance="40px">
          <div
            className="card-body"
            style={{ width: publication.logo_path ? "90%" : "100%" }}
          >
            <div
              className="body-header"
              style={{ backgroundColor: theme.headerColor }}
            >
              <div className="body-header-title">
                <h2
                  className="card-title"
                  style={{ color: theme.text, width: "120%" }}
                >
                  {publication.title}
                </h2>
              </div>
            </div>
            <div className="body-content">
              {publication.authors && <p>{publication.authors}</p>}
              {publication.descriptions.map((sentence) => {
                return (
                  <p className="content-list" style={{ color: theme.text }}>
                    {sentence}
                  </p>
                );
              })}
              {publication.code_link && (
                <a
                  href={publication.code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="button-code" style={{ color: theme.text }}>
                    Code
                  </p>
                </a>
              )}
              {publication.paper_link && (
                <a
                  href={publication.paper_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="button-paper" style={{ color: theme.text }}>
                    Paper
                  </p>
                </a>
              )}
              {publication.website_link && (
                <a
                  href={publication.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="button-project" style={{ color: theme.text }}>
                    Project Page
                  </p>
                </a>
              )}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default PublicationCard;
