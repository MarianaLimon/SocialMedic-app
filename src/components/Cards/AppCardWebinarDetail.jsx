import React from "react";

import AppPostVideoBanner from "./AppPostVideoBanner";
import AppPostAuthorInfo from "./AppPostAuthorInfo";
import AppPostReactions from "./AppPostReactions";
import AppCardReplies from "./AppCardRplies";
import ReactPlayer from "react-player";

import Styles from "./AppCardWebinarDetail.module.css";

export default function AppCardWebinarDetail({
  cardId,
  cardImage,
  cardTitle,
  cardLink,
  cardTags,
  cardAutor,
  cardAutorAvatar,
  cardDate,
  cardVideo,
  cardDuration,
  cardContent,
  ...props
}) {
  const buildVideo = (title, url) => {
    if (cardVideo) {
      return (
        // Render a YouTube video player
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          controls={false}
          width="100%"
          styles="background-color: #f0f2f5;"
        />
      );
    }
    return <AppPostVideoBanner size="webinar-detail" />;
  };

  return (
    <React.Fragment>
      <article className="card mb-3">
        {/* Banner del Webinar */}
        {buildVideo(cardTitle, cardVideo)}
        <div className={`card-body ${Styles.CardBody}`}>
          {/* Title */}
          <h2 className={`${Styles.PublishedTitle}`}>
            <a href={cardLink ? cardLink : "#"}>
              {cardTitle ? cardTitle : "Title"}
            </a>
          </h2>

          {/* Contenedor del avatar y el name */}
          <AppPostAuthorInfo
            estado="full-info"
            authorName={cardAutor ? cardAutor : ""}
            authorAvatar={cardAutorAvatar ? cardAutorAvatar : ""}
            postDate={cardDate ? cardDate : ""}
          />

          {/* Reactions */}
          <AppPostReactions
            idDocument={cardId ? cardId : ""}
            typeDomument="webinars"
            linkReply="#replytext"
          />

          {/* Content */}
          <div
            className={`${Styles.PublishedContent}`}
            dangerouslySetInnerHTML={{ __html: cardContent }}
          ></div>
        </div>{" "}
        {/* Fin del Card Body */}
        {/* /////////////////  Seccion Comments  ////////////// */}
        <AppCardReplies documentId={cardId} documentType={"webinars"} />
      </article>
    </React.Fragment>
  );
}
