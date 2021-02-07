import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { LS_TOKEN } from "../constants";
import spotifyLogo from "../images/spotify_logo.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<
    ILoginForm
  >({
    mode: "onChange",
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LS_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-2.5 md:mt-6 lg:mt-6">
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      <div className="w-full max-w-screen-2xl flex flex-col items-center border-b border-solid border-gray-300">
        <Link to="/">
          <img
            src={spotifyLogo}
            className="w-32 lg:w-48 md:w-48 mb-2.5 md:mb-6 lg:mb-6"
            alt="Spotify"
          />
        </Link>
      </div>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full pt-8 font-bold text-center text-base mb-5">
          계속하려면 Spotify에 로그인하세요.
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <h4 className="w-full font-bold text-left text-sm">이메일 주소</h4>
          <input
            ref={register({
              required: "Spotify 이메일 주소를 입력하세요.",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="이메일 주소"
            className="focus:outline-none focus:border-gray-500 p-2 border border-gray-300 text-sm font-bold border-gray-200 transition-colors"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <h4 className="w-full font-bold text-left text-sm">비밀번호</h4>
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="비밀번호"
            className="focus:outline-none focus:border-gray-500 p-2 border border-gray-300 text-sm font-bold border-gray-200 transition-colors"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"로그인하기"}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="w-full flex flex-col items-center">
          <h4 className="w-full pt-4 font-bold text-center text-base mb-5">
            계정이 없나요?
          </h4>
          <Link
            to="/create-account"
            className="w-full h-11 flex flex-col items-center justify-center border-2 border-solid rounded-3xl border-gray-500 font-bold text-gray-500 hover:bg-gray-500 hover:text-white transition-colors"
          >
            SPOTIFY에 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};
