import React from "react";
import podcastDefault from "../images/podcast_default.svg";

interface IPodcast {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const EditPodcast = (props: any) => {
  const podcast: IPodcast = props.data.podcasts?.myPodcasts.podcasts.find(
    (podcast: IPodcast) => podcast.id + "" === props.data.paramId
  );
  return (
    <div className="w-full h-auto mb-32 bg-indigo-400 pt-20 px-10">
      <div className="w-full h-64 flex items-end">
        <div className="mb-5 mr-5 flex items-end shadow-2xl">
          <img
            src={podcastDefault}
            className="w-48 h-48 bg-gray-700"
            alt="podcast default"
          />
        </div>
        <div className="mb-5 flex flex-col items-start">
          <span className="text-sm text-white text-opacity-50">
            {podcast?.category}
          </span>
          <span className="text-5xl text-white font-bold pt-1 pb-2">
            {podcast?.title}
          </span>
          <span className="text-sm text-white text-opacity-70">
            {podcast?.description}
          </span>
        </div>
      </div>
      <div>
        <div>에피소드 목록</div>
      </div>
    </div>
  );
};
