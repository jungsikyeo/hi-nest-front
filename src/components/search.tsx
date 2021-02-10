import React from "react";
import {
  faChevronLeft,
  faChevronRight,
  faCaretDown,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

export const Search = () => {
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  const forward = () => {
    history.goForward();
  };
  return (
    <section className="flex justify-between p-2">
      <div className="w-96 flex flex-row items-center justify-start">
        <div className="mr-4 ">
          <a
            onClick={back}
            className="w-7 h-7 rounded-full bg-black flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
          </a>
        </div>
        <div className="mr-4 hidden sm:block">
          <a
            onClick={forward}
            className="w-7 h-7 rounded-full bg-black flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-white" />
          </a>
        </div>
        <div className="w-full flex items-center">
          <FontAwesomeIcon icon={faSearch} className="text-black fixed ml-3" />
          <input
            type="text"
            placeholder="아티스트, 곡 또는 팟캐스트를 검색하세요"
            className="w-full w-auto h-8 rounded-2xl text-xs outline-none text-left text-black overflow-ellipsis pl-10"
          />
        </div>
      </div>
      <div
        className="flex items-center justify-end"
        style={{ paddingRight: "220px" }}
      >
        <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center mx-2">
          <FontAwesomeIcon icon={faUser} className="text-xs text-white" />
        </div>
        <div className="mr-2 hidden lg:block">여정식</div>
        <div className="mr-5 hidden lg:block">
          <FontAwesomeIcon icon={faCaretDown} className="text-white" />
        </div>
      </div>
    </section>
  );
};
