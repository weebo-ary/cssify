/* eslint-disable import/first */
const FileDownload = require("js-file-download");
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import ResizablePanels from "./ResizablePanels/ResizablePanels";
import ReactForm from "../../containers/ReactForm";


import ComponentForm from "../ComponentForm/ComponentForm";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import Typography from "../Typography/Typography";
import { selectedComponent, formSchemaObject } from "../../store";

import "./Playground.css";
import CustomSizes from "../CustomSizes/CustomSizes";
import Card from "../Card/Card";
import CustomForms from "../CustomForms/CustomForms";
import Links from "../Minimals/Links";
import ScaleText from "../Minimals/ScaleText";
import Title from "../Minimals/Title";
import Container from "../Skeleton/Container";
import Flexbox from "../Skeleton/Flexbox";
import Table from "../Table/Table";
import fileDownload from "js-file-download";


const URL="http://localhost:8080/"

const Button = () => {
  const formData = useRecoilValue(formSchemaObject);

  return (<button
    type="button"
    className="bg-black white"
    style={{
      height: "60px",
    }}

    onClick = {e => {
      e.preventDefault()
      fetch(URL, {
        method: "POST",
        body: formData
      })
        .then(response => {
          return response.text();
        })
        .then(res => {
          fetch(`${URL}${res}`)
          .then(res => {
            return res.text()
          })
          .then(content => {
            FileDownload(content, 'stylesheet.css')
          })
        })
        .catch(e => {
          console.log(e);
        })
      

    }}

  >
    Get CSS!
  </button>)
}



const Playground = () => {
  const [component, setComponent] = useRecoilState(selectedComponent);

  const renderComponent = (comp) => {
    switch (comp) {
      case "button":
        return <ButtonGroup />;
      case "typography":
        return <Typography />;
      case "customSizes":
        return <CustomSizes />;
      case "card":
        return <Card />;
      case "forms":
        return <CustomForms />;
      case "links":
        return <Links />;
      case "scaleText":
        return <ScaleText />;
      case "title":
        return <Title />;
      case "container":
        return <Container />;
      case "flexbox":
        return <Flexbox />;
      case "table":
        return <Table />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="banner">
        <h2>Create your own stylesheet.</h2>
        <Button />
      </div>
      <ResizablePanels>
        <ComponentForm />
        <ReactForm />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <span>Preview</span>
          {renderComponent(component)}
        </div>
      </ResizablePanels>
    </div>
  );
};

export default Playground;
