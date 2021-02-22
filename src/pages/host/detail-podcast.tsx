import React from "react";
import { useState } from "react";
import { Episodes } from "../../components/episodes";
import { EditPodcast } from "./edit-podcast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SearchApiEpisodes } from "../../components/search-api-episodes";
import { Thumbnail } from "../../components/thumbnail";
import playIcon from "../../images/play.svg";

interface IPodcast {
  id: number;
  title: string;
  category: string;
  description: string;
  episodes: any;
}

export const DetailPodcast = (props: any) => {
  const [searchItems, setSearchItems] = useState([]);
  const podcast: IPodcast = props.data.podcasts?.myPodcasts.podcasts.find(
    (podcast: IPodcast) => podcast.id === +props.data.paramId
  );

  const [editBoxState, setEditBoxState] = useState(false);
  const onEditBoxClick = () =>
    setEditBoxState((editBoxState) => (editBoxState = !editBoxState));

  const onChangeSearchApiText = (e: any) => {
    axios
      .get(
        `https://nuber-eats-yjs-backend.herokuapp.com/spotify/api/auth?searchText=${e.target.value}`
      )
      .then(({ data }) => {
        setSearchItems(data.episodes);
      });
  };

  const onPlaying = () => {
    const trackList = podcast?.episodes.map((episodes: any) => episodes.playId);
    props.tracks(trackList);
  };

  return (
    <div className="w-full py-5 px-10" style={{ minWidth: "500px" }}>
      <div className="w-full h-52 flex items-end">
        <Thumbnail data={podcast} />
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
            <section className="py-7">
              <div
                className="flex items-center justify-center w-14 h-14 rounded-full"
                style={{ backgroundColor: "#1db954" }}
              >
                <button
                  onClick={onPlaying}
                  className="outline-none focus:outline-none"
                >
                  <img src={playIcon} alt="play" />
                </button>
              </div>
            </section>
            <section
              className="grid gap-4 grid-cols-4 text-xs h-15 border-b border-solid border-gray-700 border-opacity-50 pt-5 pb-2"
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
            {podcast?.episodes.map((episode: any, index: number) => (
              <Episodes key={index} data={{ episode, index }} />
            ))}
            <div className="pb-5 border-t border-solid border-gray-700 border-opacity-50">
              {" "}
            </div>
            <section className="w-full h-15 text-2xl text-white font-medium pl-5 py-2 mt-5">
              <div>
                <span>플레이리스트에 추가할 곡을 찾아보세요</span>
              </div>
              <div className="w-full pt-5 flex items-center relative">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-black absolute ml-3"
                />
                <input
                  type="text"
                  placeholder="곡 또는 아티스트를 입력해주세요."
                  onChange={onChangeSearchApiText}
                  className="w-auto h-10  rounded-md text-sm outline-none text-left text-black overflow-ellipsis pl-10"
                  style={{ width: "300px" }}
                />
              </div>
            </section>
            {searchItems?.map((episode, index) => (
              <SearchApiEpisodes data={{ episode, index }} />
            ))}
          </div>
        </div>
      </div>
      {editBoxState && (
        <EditPodcast
          podcast={podcast}
          editBoxState={editBoxState}
          onEditBoxClick={onEditBoxClick}
        />
      )}
    </div>
  );
};
