import {
  faUser,
  faBars,
  faTimes,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  const [editing, setEditing] = useState(false);
  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <header className="bg-black">
      <div className="w-full px-3 py-2 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="text-sm flex items-center">
            <img
              src={spotifyLogoWhite}
              className="w-20 md:w-40"
              alt="Spotify"
            />
          </div>
        </Link>
        <div className="flex">
          {data?.me ? (
            <div className="flex flex-row justify-between">
              <div className="text-xs pr-3 flex items-center">
                <Link to="/my-profile" className="hover:text-green-500">
                  <div className="w-full p-2 rounded-3xl border-2 border-white">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-sm text-white"
                    />
                  </div>
                </Link>
              </div>
              <div className="w-full p-2 text-white hidden md:block">
                <Link
                  to="/logout"
                  className="flex items-center hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
                  <span className="">로그아웃</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="hidden md:block text-white font-bold">
              <span className="pr-8">
                <Link to="/create-account" className="hover:text-green-500">
                  가입하기
                </Link>
              </span>
              <span className="pr-8">
                <Link to="/login" className="hover:text-green-500">
                  로그인하기
                </Link>
              </span>
            </div>
          )}
          <span className="w-full p-2 md:hidden">
            <a onClick={toggleEditing} className="cursor-pointer">
              <FontAwesomeIcon
                icon={faBars}
                className="text-2xl text-white hover:text-green-500"
              />
            </a>
          </span>
        </div>
        {editing ? (
          <div className="flex absolute left-full md:hidden">
            <div className="left-0 bg-black w-screen h-screen fixed top-0 opacity-50 z-40">
              {""}
            </div>
            <nav className="flex flex-col justify-between right-0 bg-black border-0 m-0 p-8 h-screen fixed top-0 w-80 z-40 text-white font-bold">
              <div className="flex flex-row justify-between">
                <ul>
                  <li className="text-3xl pb-6">
                    {!data?.me ? (
                      <Link
                        to="/create-account"
                        onClick={toggleEditing}
                        className="hover:text-green-500"
                      >
                        가입하기
                      </Link>
                    ) : (
                      <Link
                        to="/my-profile"
                        onClick={toggleEditing}
                        className="hover:text-green-500"
                      >
                        계정
                      </Link>
                    )}
                  </li>
                  <li className="text-3xl pb-6">
                    {!data?.me ? (
                      <Link
                        to="/login"
                        onClick={toggleEditing}
                        className="hover:text-green-500"
                      >
                        로그인하기
                      </Link>
                    ) : (
                      <Link
                        to="/logout"
                        onClick={toggleEditing}
                        className="hover:text-green-500"
                      >
                        로그아웃하기
                      </Link>
                    )}
                  </li>
                </ul>
                <span>
                  <a
                    type="button"
                    onClick={toggleEditing}
                    className="text-white z-50 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-2xl text-white hover:text-green-500"
                    />
                  </a>
                </span>
              </div>
              <Link to="/">
                <div className="text-sm flex items-center">
                  <img src={spotifyLogoWhite} className="w-20" alt="Spotify" />
                </div>
              </Link>
            </nav>
          </div>
        ) : (
          ``
        )}
      </div>
    </header>
  );
};
