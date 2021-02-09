import React from "react";
import KakaoLogin from "react-kakao-login";

const token = "b6b461e12a2fe23d0de82a9d6c7a5863";

export default {
  title: "KakaoLogin",
  component: KakaoLogin,
};

export const kakaoLoginButton = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
  />
);

export const UseLoginForm = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
    useLoginForm
  />
);

export const WithChildren = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
  >
    <div style={{ color: "red" }}>카카오톡 로그인</div>
  </KakaoLogin>
);

export const WithStyle = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
    style={{
      color: "blue",
      backgroundColor: "red",
    }}
  />
);

export const WithClassName = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
    className="can-you-see-me?"
  />
);

export const WithRender = () => (
  <KakaoLogin
    token={token}
    onSuccess={console.log}
    onFail={console.error}
    onLogout={console.info}
    render={({ onClick }) => {
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          카카오로 로그인하기
        </a>
      );
    }}
  />
);
