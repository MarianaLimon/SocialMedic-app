import React from "react";
import "./icons.css";
import { Icon, InlineIcon } from "@iconify/react";
import homeIcon from "@iconify/icons-vaadin/home";
import movieIcon from "@iconify/icons-vaadin/movie";
import newspaperIcon from "@iconify/icons-vaadin/newspaper";
import pillsIcon from "@iconify/icons-vaadin/pills";
import thumbsUp from "@iconify/icons-vaadin/thumbs-up";
import commentsIcon from "@iconify/icons-vaadin/comments";
import filterIcon from "@iconify/icons-vaadin/filter";
import doctorIcon from "@iconify/icons-vaadin/doctor";
import trashIcon from "@iconify/icons-vaadin/trash";
import hamburger from "@iconify/icons-bx/bx-menu";
import pencilIcon from '@iconify/icons-vaadin/pencil';
import shieldIcon from '@iconify/icons-vaadin/shield';

function Icons(props) {
  switch (props.value) {
    case "home":
      return <Icon icon={homeIcon} className={`icon ${props.className}`} />;
    case "webinars":
      return <Icon icon={movieIcon} className={`icon ${props.className}`} />;
    case "articles":
      return <Icon icon={newspaperIcon} className={`icon ${props.className}`} />;
    case "products":
      return <Icon icon={pillsIcon} className={`icon ${props.className}`} />;
    case "likes":
      return <Icon icon={thumbsUp} className={`icon ${props.className}`} />;
    case "comments":
      return <Icon icon={commentsIcon} className={`icon commentsIcon ${props.className}`}/>;
    case "filter":
      return <Icon icon={filterIcon} className={`icon ${props.className}`} />;
    case "doctor":
      return <Icon icon={doctorIcon} className={`icon ${props.className}`} />;
    case "delete":
      return <Icon icon={trashIcon} className={`icon hamburger deleteIcon ${props.className}`} />;
    case "menu":
      return <Icon icon={hamburger} className={`icon hamburger ${props.className}`} />;
    case "edit":
      return <Icon icon={pencilIcon} className={`icon ${props.className}`} />;
    case "validate":
      return <Icon icon={shieldIcon} className={`icon ${props.className}`} />;
    default:
      return "sin icono";
  }
}

export default Icons;
