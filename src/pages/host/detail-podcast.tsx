import React from "react";
import podcastDefault from "../../images/podcast_default.svg";
import { useState } from "react";
import playIcon from "../../images/play.svg";
import heartFill from "../../images/heart_fill.svg";
import heartFull from "../../images/heart_full.svg";
import {Episodes} from "../../components/episodes";
import {EditPodcast} from "./edit-podcast";

interface IPodcast {
  id: number;
  title: string;
  category: string;
  description: string;
  episodes: any;
}

export const DetailPodcast = (props: any) => {
  const podcast: IPodcast = props.data.podcasts?.myPodcasts.podcasts.find(
    (podcast: IPodcast) => podcast.id === +props.data.paramId
  );

  const [editBoxState, setEditBoxState] = useState(false);
  const onEditBoxClick = () =>
    setEditBoxState((editBoxState) => (editBoxState = !editBoxState));

  return (
    <div className="w-full py-5 px-10" style={{minWidth: "500px"}}>
      <div className="w-full h-52 flex items-end">
        <div className="mb-5 mr-5 flex items-end shadow-2xl">
          <img
            src={podcastDefault}
            className="bg-gray-700"
            style={{width:"200px", height:"200px"}}
            alt="podcast default"
          />
        </div>
        <div className="w-auto mb-5 flex flex-col items-start">
          <span className="text-sm text-white text-opacity-50">
            {podcast?.category}
          </span>
          <span className="text-5xl text-white font-bold pt-1 pb-2">
            <a onClick={onEditBoxClick} className="cursor-pointer">
              {podcast?.title}
            </a>
          </span>
          <span className="text-sm text-white text-opacity-70">
            {podcast?.description}
          </span>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="flex flex-col">
            {podcast?.episodes.length > 0 ? (
              <section
                className="grid gap-4 grid-cols-4 text-xs h-15 border-b border-solid border-gray-700 border-opacity-50 pb-2"
                style={{
                  gridTemplateColumns:
                    "[index] 16px [first] 6fr [var1] 4fr [last] minmax(120px,1fr)",
                }}
              >
                <span className="pl-5">#</span>
                <span>제목</span>
                <span>앨범</span>
                <span>재생시간</span>
              </section>
            ) : (
              <section className="h-15 text-2xl text-white font-medium pl-5 py-2 mt-5">
                <div>
                  <span>플레이리스트에 추가할 곡을 찾아보세요</span>
                </div>
              </section>
            )}
            {podcast?.episodes.map((episode: any, index: number) => (
              <Episodes data={{ episode, index }} />
            ))}
          </div>
        </div>
      </div>
      {editBoxState && (
        <EditPodcast podcast={podcast} editBoxState={editBoxState} onEditBoxClick={onEditBoxClick} />
      )}
    </div>
  );
};
