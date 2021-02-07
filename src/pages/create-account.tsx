import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import spotifyLogo from "../images/spotify_logo.svg";
import {
  createAccountMutation,
  createAccountMutationVariables
} from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const { register, getValues, errors, handleSubmit, formState } = useForm<
    ICreateAccountForm
  >({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Listener
    }
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok }
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult }
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role }
        }
      });
    }
  };

  return (
      <div className="h-screen flex items-center flex-col mt-2.5 md:mt-6 lg:mt-6">
      <Helmet>
        <title>Create Account | Podcast</title>
      </Helmet>
      <div className="w-full max-w-screen-2xl flex flex-col items-center border-b border-solid border-gray-300">
        <img src={spotifyLogo} className="w-32 lg:w-48 md:w-48 mb-2.5 md:mb-6 lg:mb-6" alt="Spotify" />
      </div>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <h4 className="w-full pt-8 font-bold text-center text-base mb-5">
          이메일 주소로 가입하기
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <h4 className="w-full font-bold text-left text-sm">
            이메일이 어떻게 되시나요?
          </h4>
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="focus:outline-none focus:border-gray-500 p-2 border border-gray-300 text-sm font-bold border-gray-200 transition-colors"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <h4 className="w-full font-bold text-left text-sm">
            비밀번호를 만드세요.
          </h4>
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="focus:outline-none focus:border-gray-500 p-2 border border-gray-300 text-sm font-bold border-gray-200 transition-colors"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <h4 className="w-full font-bold text-left text-sm">
            가입 유형을 선택하세요.
          </h4>
          <select
            name="role"
            ref={register({ required: true })}
            className="focus:outline-none focus:border-gray-500 p-2 border border-gray-300 text-sm font-bold border-gray-200 transition-colors"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"가입하기"}
          />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div className="text-sm font-bold">
          계정이 있나요?{" "}
          <Link to="/" className="text-green-700 underline">
            로그인하세요.
          </Link>
        </div>
      </div>
    </div>
  );
};
