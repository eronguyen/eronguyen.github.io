import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Publications from "../../containers/publications/Publications";
import "./PublicationComponent.css";

class Publication extends Component {
  render() {
    return (
      <div className="publication-main">
        <Header theme={this.props.theme} />
        <div className="basic-publication">
          <Publications theme={this.props.theme} />
        </div>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Publication;
