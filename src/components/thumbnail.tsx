import React from "react";
import podcastDefault from "../images/podcast_default.svg";
import { IEpisode } from "./search-api-episodes";

export const Thumbnail = (props: any) => {
  const podcast = props.data;
  let img1, img2, img3, img4, defaultImg;
  podcast?.episodes.forEach((episode: IEpisode, index: number) => {
    if (podcast?.episodes.length >= 1) {
      if (index == 0) {
        img1 = (
          <img
            src={episode?.imageUrl}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        );
        defaultImg = (
          <img
            src={episode?.imageUrl}
            style={{ width: "200px", height: "200px" }}
            alt=""
          />
        );
      }
      if (index == 1)
        img2 = (
          <img
            src={episode?.imageUrl}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        );
      if (index == 2)
        img3 = (
          <img
            src={episode?.imageUrl}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        );
      if (index == 3)
        img4 = (
          <img
            src={episode?.imageUrl}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        );
    }
  });

  return (
    <div className="mx-2 flex items-center justify-center shadow-2xl">
      {podcast?.episodes.length === 0 && (
        <div className="flex">
          <img
            src={podcastDefault}
            className="bg-gray-700"
            style={{ width: "200px", height: "200px" }}
            alt="podcast default"
          />
        </div>
      )}
      {podcast?.episodes.length >= 1 && podcast?.episodes.length < 4 && (
        <div className="flex">{defaultImg}</div>
      )}
      {podcast?.episodes.length >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2">
          {img1}
          {img2}
          {img3}
          {img4}
        </div>
      )}
    </div>
  );
};
