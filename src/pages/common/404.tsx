import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

export const NotFound = () => (
  <>
    <Header />
    <div className="bg-pink-200 min-h-screen flex flex-col text-center pt-8 md:pb-32 xl:pb-40">
      <div className="mr-auto ml-auto pl-3 pr-3 pb-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center">
            <div className="float-left relative w-64 min-h-0 pl-4 pr-4 mt-0 mb-auto text-center">
              <img
                className="max-w-full h-auto w-full animate-spin"
                src="https://www.scdn.co/i/404/record.svg"
                alt="record"
              />
              <img
                className="absolute top-3 right-5 w-5/12"
                src="https://www.scdn.co/i/404/record-arm.svg"
                alt="record-arm"
              />
            </div>
          </div>
          <div className="w-full float-left relative min-h-0 pl-8 pr-8 pt-6 text-left">
            <h1 className="text-xl font-bold">
              이 페이지는 더 이상 존재하지 않습니다.
            </h1>
            <p className="pt-3">검색하신 페이지를 찾을 수 없습니다.</p>
            <p className="pt-1 pb-10">
              Sportify의 FAQ 또는 커뮤니티에 도움을 요청해보세요.
            </p>
            <Link
              to="/"
              className="font-bold text-sm hover:opacity-70 hover:underline"
            >
              홈으로 이동하기.
            </Link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
);
