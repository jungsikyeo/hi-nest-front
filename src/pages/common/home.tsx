import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./header";
import circles from "../../images/circles.svg";
import apple from "../../images/apple.svg";
import google from "../../images/google.svg";
import { Footer } from "./footer";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <Header />
      <main
        className="w-full flex flex-col items-center max-h-full"
        style={{ minHeight: "480px" }}
      >
        <div
          className="w-full px-5 pt-14 text-4xl font-bold text-white"
          style={{
            fontFamily: "font-do-hyeon",
            fontWeight: 900,
          }}
        >
          <h1 className="md:text-5xl tracking-tight leading-tight md:leading-snug">
            다양한&nbsp;해외&nbsp;히트곡과
          </h1>
          <h1 className="md:text-5xl tracking-tight leading-tight md:leading-snug">
            국내&nbsp;인기&nbsp;음악을 들어보세요
          </h1>
        </div>
        <div className="w-full px-5 pt-8 flex text-sm text-white">
          <span>
            <p>
              이 사이트는 노마드코더 강의 중 우버이츠 챌린지 과제 일환으로
              만들어졌습니다.
            </p>
            <p>
              최근 Spotify 사이트가 국내 버전으로 오픈되어, 제 우버이츠 챌린지
              졸업 작품의 모티브가 되었습니다.
            </p>
            <br />
            <p>
              Host 권한으로 가입하면 Spotify API 를 이용하여 자신만의 자신만의
              플레이리스트를 만들 수 있습니다.
            </p>
            <p>
              Listener 권한으로 가입하면 Host가 만든 플레이리스트를 구독하고
              음악을 청취할 수 있습니다.
            </p>
          </span>
        </div>
        <div className="w-full px-5 py-8 flex flex-col items-center md:flex-row md:items-start">
          <span className="pb-3 md:pr-3">
            <a href="https://play.google.com/store/apps/details?id=com.spotify.music">
              <img src={google} className="h-10" alt="Google" />
            </a>
          </span>
          <span className="">
            <a href="https://apps.apple.com/app/spotify-music-and-podcasts/id324684580">
              <img src={apple} className="h-10" alt="Apple" />
            </a>
          </span>
        </div>
        <div className="w-full px-5 mb-5 flex text-xs text-white tracking-tighter">
          <span>
            약관이 없습니다. 진짜 Spotify 서비스를 이용하시려면 위 링크를
            클릭하여 앱을 설치하세요.
          </span>
        </div>
        <div
          className="absolute top-0 flex flex-col items-center w-screen h-screen bg-gradient-to-b from-red-400 to-yellow-400"
          style={{ zIndex: -1 }}
        >
          <div className="h-auto px-20" style={{ width: "900px" }}>
            <img src={circles} className="w-full" alt="Circles" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
