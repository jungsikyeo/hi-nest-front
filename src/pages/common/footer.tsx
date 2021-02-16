import React from "react";
import { Link } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import instagramIcon from "../../images/instagram_icon.svg";
import facebookIcon from "../../images/facebook_icon.svg";

export const Footer: React.FC = () => {
  const detailInfo = () => {
    alert("비밀~ ^.^;");
  };
  const recruitInfo = () => {
    alert("힝 속았지~? ^.~");
  };
  return (
    <footer className="bg-black xl:w-full">
      <div className="w-full px-3 py-10 xl:px-0 flex flex-col items-start sm:flex-col sm:items-start lg:flex-row lg:justify-around">
        <Link to="/" className="pb-10 md:px-20">
          <div className="text-sm flex items-center">
            <img
              src={spotifyLogoWhite}
              className="w-20 lg:w-48"
              alt="Spotify"
            />
          </div>
        </Link>
        <div className="flex flex-col md:px-20 md:w-full md:flex-row md:justify-between">
          <div className="text-white flex flex-col items-start pb-10">
            <span className="text-gray-500 text-xs font-bold">회사</span>
            <span className="pt-3 text-sm font-bold">
              <a onClick={detailInfo} className="cursor-pointer">
                상세정보
              </a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a onClick={recruitInfo} className="cursor-pointer">
                채용정보
              </a>
            </span>
          </div>
          <div className="text-white flex flex-col items-start pb-10">
            <span className="text-gray-500 text-xs font-bold">커뮤니티</span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/users/mdotcom12">개발자</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/users/mdotcom12">투자자</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/users/serranoarevalo">공급업체</a>
            </span>
          </div>
          <div className="text-white flex flex-col items-start pb-10">
            <span className="text-gray-500 text-xs font-bold">
              노마드코더 링크
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/courses">코스</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/challenges">챌린지</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/community">수다방</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/faq">FAQ</a>
            </span>
            <span className="pt-3 text-sm font-bold">
              <a href="https://nomadcoders.co/roadmap">로드맵</a>
            </span>
          </div>
        </div>
        <ul className="flex flex-row justify-start md:px-20">
          <li className="mr-3">
            <a
              href="https://instagram.com/1985yjs"
              className="rounded-3xl bg-gray-800 w-10 h-10 inline-flex items-center justify-center"
              title="Instagram"
            >
              <img
                src={instagramIcon}
                className="w-5 h-5 bg-white"
                alt="instagram"
              />
            </a>
          </li>
          <li className="mr-3">
            <a
              href="https://facebook.com/jeongsik.yeo/"
              className="rounded-3xl bg-gray-800 w-10 h-10 inline-flex items-center justify-center"
              title="Facebook"
            >
              <img
                src={facebookIcon}
                className="w-5 h-5 bg-white"
                alt="facebook"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
