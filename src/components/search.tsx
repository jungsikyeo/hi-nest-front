import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faUser,
  faSearch,
  faCaretUp,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";

export const Search = (props: any) => {
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const forward = () => {
    history.goForward();
  };

  const [menuBox, setMenuBox] = useState(false);
  const onMenuBox = () => setMenuBox((menuBox) => (menuBox = !menuBox));

  return (
    <section className="flex justify-between py-2">
      <div className="w-1/3 flex flex-row items-center justify-start">
        <div className="mr-3 ">
          <a
            onClick={back}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
          </a>
        </div>
        <div className="mr-3 hidden sm:block">
          <a
            onClick={forward}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-white" />
          </a>
        </div>
        <div className="w-full flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-black fixed ml-3" />
          <input
            type="text"
            placeholder="카테고리명 또는 팟캐스트를 검색하세요"
            onChange={props.handleOnchange}
            className="w-full w-auto h-10 rounded-3xl text-sm outline-none text-left text-black overflow-ellipsis pl-10"
          />
        </div>
      </div>
      <div
        className="flex items-center justify-end"
        style={{ paddingRight: "220px" }}
      >
        <div
          className="h-10 bg-black rounded-3xl flex items-center hover:bg-gray-800 cursor-pointer"
          onClick={onMenuBox}
        >
          <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center mx-2">
            <FontAwesomeIcon icon={faUser} className="text-xs text-white" />
          </div>
          <div className="mr-2 hidden lg:block text-sm font-bold">
            <span>여정식</span>
          </div>
          <div className="mr-5 hidden lg:block">
            {!menuBox ? (
              <FontAwesomeIcon icon={faCaretDown} className="text-white" />
            ) : (
              <FontAwesomeIcon icon={faCaretUp} className="text-white" />
            )}
          </div>
        </div>
        {menuBox && (
          <div className="w-32 h-24 bg-black rounded-md fixed top-12 mt-2 flex flex-col justify-around">
            <div className="w-full">
              <Link
                to="/my-profile"
                className="flex items-center hover:text-white mx-2 p-2 rounded-md hover:bg-gray-800 hover:text-white"
              >
                <span className="text-sm">프로필</span>
              </Link>
            </div>
            <div className="w-full">
              <Link
                to="/logout"
                className="flex items-center hover:text-white mx-2 p-2 rounded-md hover:bg-gray-800 hover:text-white"
              >
                <span className="text-sm">로그아웃</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
