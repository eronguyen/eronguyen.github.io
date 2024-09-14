import React, { Component } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { Accordion } from "baseui/accordion";

class ExperienceAccordion extends Component {
  render() {
    const theme = this.props.theme;
    const section = this.props.sections[0];
    return (
      <div
        style={{
          backgroundColor: theme.body,
          color: theme.text,
          width: "70%",
          margin: "auto",
          fontFamily: "Google Sans Regular",
          ":hover": {
            color: `${theme.secondaryText}`,
          },
        }}
      >
        <Accordion>
          {section["experiences"].map((experience, index) => {
            return (
              <ExperienceCard
                index={index}
                totalCards={section["experiences"].length}
                experience={experience}
                theme={theme}
              />
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default ExperienceAccordion;
