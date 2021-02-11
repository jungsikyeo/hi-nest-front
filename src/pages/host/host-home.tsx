import React, { useState } from "react";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { Search } from "../../components/search";
import { MyPodcasts } from "../../components/my-podcasts";
import { gql, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../../fragments";

const PODCAST_QUERY = gql`
  query PodcastQuery {
    myPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const HostHome = () => {
  const { data } = useQuery(PODCAST_QUERY);
  const location = useLocation();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-500">
      <Helmet>
        <title>Host | Podcast</title>
      </Helmet>
      <div className="flex bg-black">
        <div
          className="fixed bg-black h-screen px-1"
          style={{ width: "230px" }}
        >
          <div className="pl-5 py-5">
            <Link to="/">
              <img src={spotifyLogoWhite} className="w-32" alt="Spotify" />
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/"
              className={`flex items-center hover:text-white mx-2 py-1 rounded-md ${
                location.pathname === "/" && "bg-gray-800 text-white"
              }`}
            >
              <span className="text-2xl px-3">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="text-sm">홈</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/search"
              className={`flex items-center hover:text-white mx-2 py-1 rounded-md ${
                location.pathname === "/search" && "bg-gray-800 text-white"
              }`}
            >
              <span className="text-2xl px-3">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <span className="text-sm">검색하기</span>
            </Link>
          </div>
          <div className="px-5 pt-5 pb-3">
            <span className="text-xs text-white tracking-wider">
              플레이리스트
            </span>
          </div>
          <div className="flex items-center hover:text-white cursor-pointer mx-5 pb-3 mb-3 border-b border-solid border-gray-500 border-opacity-40">
            <span className="mr-3 bg-gray-100 bg-opacity-30 w-7 h-7 rounded-sm flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="text-black" />
            </span>
            <span className="text-sm">플레이리스트 만들기</span>
          </div>
          {data?.myPodcasts.podcasts?.map((podcast: any) => (
            <div
              key={podcast.id}
              className="text-white text-sm tracking-wider pt-3 px-5 overflow-x-hidden overflow-ellipsis whitespace-nowrap"
            >
              {podcast.title}
            </div>
          ))}
        </div>
        <div
          className="w-full h-screen flex bg-black flex-col"
          style={{ paddingLeft: "230px" }}
        >
          <div className="w-full fixed h-14 text-white px-10 bg-gray-900 bg-opacity-95">
            <Search />
          </div>
          <div className="w-full pt-20 px-10 overflow-y-auto">
            <MyPodcasts data={data} />
          </div>
        </div>
      </div>
      <div className="bg-red-500 fixed bottom-0 w-full h-20">player</div>
    </div>
  );
};
