import React from "react";
import podcastDefault from "../../images/podcast_default.svg";
import { useState } from "react";
import { Episodes } from "../../components/episodes";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPodcast {
  id: number;
  title: string;
  category: string;
  description: string;
  episodes: any;
}

export const MyProfile = (props: any) => {
  return (
    <div
      className="w-full py-5 px-10 text-gray-500"
      style={{ minWidth: "500px" }}
    >
      <div className="w-full h-52 flex items-end">
        <div
          className="mb-5 mr-5 flex items-center justify-center bg-black bg-opacity-40 rounded-full items-end shadow-2xl"
          style={{ width: "200px", height: "200px" }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div className="w-auto mb-5 flex flex-col items-start">
          <span className="text-sm text-white text-opacity-50">
            프로
          </span>
          <span className="text-5xl text-white font-bold pt-1 pb-2">
            여정식
          </span>
          <span className="text-sm text-white text-opacity-70">
            구독 수
          </span>
        </div>
      </div>
    </div>
  );
};
