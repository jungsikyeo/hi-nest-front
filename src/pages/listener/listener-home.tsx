import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../../fragments";
import { Search } from "../common/search";
import { MySubscriptions } from "./my-subscriptions";
import { DetailSubscription } from "./detail-subscription";
import { MyProfile } from "../common/my-profile";
import { SearchPodcasts } from "./search-podcasts";
import { isMobile } from "react-device-detect";
import SpotifyPlayer from "react-spotify-web-playback";
import axios, { AxiosResponse } from "axios";

export const GET_ALL_PODCASTS_QUERY = gql`
  query GetAllPodcasts {
    getAllPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
    subscriptions {
      ...PodcastParts
    }
  }
  ${PODCAST_FRAGMENT}
`;

const getApiToken = () => {
  return axios.get(
    "https://spotify-clone-backend.herokuapp.com/spotify/api/callback"
  );
};

export const ListenerHome = () => {
  const [token, setToken] = useState("");
  const [trackList, setTrackList] = useState([]);

  useEffect(() => {
    getApiToken().then(({ data }) => {
      setToken(data);
    });
  }, [token]);

  let { data: podcasts } = useQuery(GET_ALL_PODCASTS_QUERY);
  const location = useLocation();
  const [, path, paramId] = location.pathname.split("/");
  const [searchText, setSearchText] = useState("");
  const [leftState, setLeftState] = useState(() => !isMobile);
  const toggleLeftState = () => setLeftState((leftState) => !leftState);

  return (
    <div className="bg-gradient-to-b from-gray-800 to-black text-gray-500">
      <Helmet>
        <title>Listener | Podcast</title>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <div className="flex" style={{ minHeight: "calc(100vh - 80px)" }}>
          {leftState ? (
            <div
              id="left"
              className="bg-black text-gray-500"
              style={{ width: "230px", minHeight: "calc(100vh - 80px)" }}
            >
              <div style={{ height: "210px" }}>
                <div className="flex justify-between pl-5 py-5">
                  <Link to="/">
                    <img
                      src={spotifyLogoWhite}
                      className="w-32"
                      alt="Spotify"
                    />
                  </Link>
                  <a
                    onClick={toggleLeftState}
                    className="cursor-pointer pr-5 flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-2xl text-white hover:text-green-500"
                    />
                  </a>
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
                      location.pathname === "/search" &&
                      "bg-gray-800 text-white"
                    }`}
                  >
                    <span className="text-2xl px-3">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <span className="text-sm">검색하기</span>
                  </Link>
                </div>
                <div className="mx-5 pt-5 border-b border-gray-300 border-opacity-20">
                  <span className="font-bold text-xs text-white text-opacity-60 tracking-wider">
                    구독리스트
                  </span>
                </div>
              </div>

              <div className="" style={{ maxHeight: "calc(100vh - 290px)" }}>
                <ul className="text-sm px-5">
                  {podcasts?.subscriptions?.map((podcast: any) => (
                    <li className="hover:text-white tracking-wider pb-3 overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                      <Link to={`/podcasts/${podcast.id}`} key={podcast.id}>
                        {podcast.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div
              id="left"
              className="bg-black text-gray-500"
              style={{ width: "50px", minHeight: "calc(100vh - 80px)" }}
            >
              <span className="w-full p-2 flex items-center justify-center">
                <a onClick={toggleLeftState} className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faBars}
                    className="text-2xl text-white hover:text-green-500"
                  />
                </a>
              </span>
            </div>
          )}

          <div
            style={{
              width: leftState ? "calc(100vw - 230px)" : "calc(100vw - 50px)",
            }}
          >
            <div
              className="w-full flex text-white px-10 bg-gray-900 bg-opacity-95"
              style={{ height: "60px" }}
            >
              <Search handleOnchange={setSearchText} />
            </div>
            <div
              className="w-full overflow-y-scroll bg-black bg-opacity-10"
              style={{ height: "200px", minHeight: "calc(100vh - 140px)" }}
            >
              {path === "my-profile" && <MyProfile />}
              {path === "podcasts" && (
                <DetailSubscription
                  data={{ podcasts, paramId }}
                  tracks={setTrackList}
                />
              )}
              {path === "search" && (
                <SearchPodcasts data={podcasts} text={searchText} />
              )}
              {path !== "my-profile" &&
                path !== "podcasts" &&
                path !== "search" && (
                  <MySubscriptions data={podcasts} text={searchText} />
                )}
            </div>
          </div>
        </div>
        <footer
          className="bg-black text-white flex items-center justify-center"
          style={{ height: "80px" }}
        >
          {token !== "" && trackList.length > 0 ? (
            <SpotifyPlayer
              token={token}
              uris={trackList}
              autoPlay={true}
              persistDeviceSelection={false}
              styles={{
                activeColor: "#fff",
                bgColor: "#333",
                color: "#fff",
                loaderColor: "#fff",
                sliderColor: "#1cb954",
                trackArtistColor: "#ccc",
                trackNameColor: "#fff",
              }}
            />
          ) : (
            <>
              <button onClick={getApiToken}>
                <span>플레이어가 대기중입니다. 재생버튼을 눌러주세요.</span>
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
};
