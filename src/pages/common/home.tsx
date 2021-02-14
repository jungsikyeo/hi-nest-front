import React from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "./header";
import circles from "../../images/circles.svg";
import apple from "../../images/apple.svg";
import google from "../../images/google.svg";
import { Footer } from "./footer";

export const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Home | Podcast</title>
      </Helmet>
      <Header />
      <main className="w-full flex flex-col items-center min-h-full max-h-full" style={{height: "450px"}}>
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
        <div className="w-full px-5 pt-8 flex text-base md:text-2xl text-white">
          <span>
            1개의 휴대폰에서 7일 동안 무료로 Spotify Premium 멤버십을
            이용해보세요. 결제 정보는 필요하지 않습니다.
          </span>
        </div>
        <div className="w-full px-5 py-8 flex flex-col items-center md:flex-row md:items-start">
          <span className="pb-3 md:pr-3">
            <img src={google} className="h-10" alt="Google" />
          </span>
          <span className="">
            <img src={apple} className="h-10" alt="Apple" />
          </span>
        </div>
        <div className="w-full px-5 mb-10 flex text-xs text-white tracking-tighter">
          <span>
            약관이 적용됩니다. Premium을 이미 이용해 보셨거나 다른 기기로
            이용하시려는 경우 이 혜택이 제공되지 않습니다. 7일 이후에도 계속
            Spotify 서비스를 이용하시려면 Premium을 구독해야 합니다.
          </span>
        </div>
        <div
          className="absolute top-0 flex flex-col items-center w-screen bg-gradient-to-b from-red-400 to-yellow-400"
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
