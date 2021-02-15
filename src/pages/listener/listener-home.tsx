import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../../fragments";
import { Search } from "../common/search";
import { MySubscriptions } from "./my-subscriptions";
import { DetailSubscription } from "./detail-subscription";
import { MyProfile } from "../common/my-profile";
import { SearchPodcasts } from "./search-podcasts";

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

export const ListenerHome = () => {
  let { data: podcasts } = useQuery(GET_ALL_PODCASTS_QUERY);
  const location = useLocation();
  const [, path, paramId] = location.pathname.split("/");
  const [searchText, setSearchText] = useState("");

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-500">
      <Helmet>
        <title>Listener | Podcast</title>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <div className="flex" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div
            id="left"
            className="bg-black text-gray-500"
            style={{ width: "230px", minHeight: "calc(100vh - 80px)" }}
          >
            <div style={{ height: "210px" }}>
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
          <div style={{ width: "calc(100vw - 230px)" }}>
            <div
              className="w-full flex text-white px-10 bg-gray-900 bg-opacity-95"
              style={{ height: "60px" }}
            >
              <Search handleOnchange={setSearchText} />
            </div>
            <div
              className="w-full overflow-y-auto bg-gray-900 bg-opacity-90"
              style={{ height: "200px", minHeight: "calc(100vh - 140px)" }}
            >
              {path === "my-profile" && <MyProfile />}
              {path === "podcasts" && (
                <DetailSubscription data={{ podcasts, paramId }} />
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
          <span>player comming soon....</span>
        </footer>
      </div>
    </div>
  );
};
