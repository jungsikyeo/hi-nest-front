import React from "react";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { Search } from "../../components/search";
import { MyPodcasts } from "../../components/my-podcasts";

export const HostHome = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-500">
      <Helmet>
        <title>Host | Podcast</title>
      </Helmet>
      <div className="flex">
        <div
          className="fixed bg-black h-screen pr-5"
          style={{ width: "220px" }}
        >
          <div className="pl-5 py-5">
            <Link to="/">
              <img src={spotifyLogoWhite} className="w-28" alt="Spotify" />
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
          <div>playlist add</div>
          <div>like list</div>
          <div>my-playlist1</div>
          <div>my-playlist2</div>
        </div>
        <div className="flex flex-col" style={{ paddingLeft: "220px" }}>
          <div className="w-full fixed h-14 text-white ">
            <Search />
          </div>
          <div className="w-full pt-14">
            <MyPodcasts />
          </div>
        </div>
        <div className="bg-white fixed bottom-0 w-full h-20">player</div>
      </div>
    </div>
  );
};
