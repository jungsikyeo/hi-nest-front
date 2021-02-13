import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import podcastDefault from "../../images/podcast_default.svg";
import { FormError } from "../../components/form-error";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import { IUpdatePodcastForm, PODCAST_QUERY } from "./host-home";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../../__generated__/updatePodcastMutation";

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($updatePodcastInput: UpdatePodcastInput!) {
    updatePodcast(input: $updatePodcastInput) {
      error
      ok
    }
  }
`;

export const EditPodcast = (props: any) => {
  const podcast = props.podcast;
  console.log(podcast);
  const history = useHistory();
  const onCompleted = (data: updatePodcastMutation) => {
    const {
      updatePodcast: { ok },
    } = data;
    if (ok) {
      history.push("/");
    }
  };
  const [
    updatePodcastMutation,
    { loading, data: updatePodcastMutationResult },
  ] = useMutation<updatePodcastMutation, updatePodcastMutationVariables>(
    UPDATE_PODCAST_MUTATION,
    {
      onCompleted,
      refetchQueries: [{ query: PODCAST_QUERY }],
    }
  );
  const onSubmit = () => {
    if (!loading) {
      let { id, title, category, description } = getValues();
      id = +id;
      updatePodcastMutation({
        variables: {
          updatePodcastInput: { id, title, category, description },
        },
      });
    }
  };
  const { register, getValues, handleSubmit, formState } = useForm<
    IUpdatePodcastForm
  >({
    mode: "onChange",
    defaultValues: {
      id: podcast?.id,
      title: podcast?.title,
      category: podcast?.category,
      description: podcast?.description,
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
        <div className="w-full h-screen bg-black bg-opacity-80"></div>

        <input type="hidden" name="id" ref={register} />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div
            className="flex flex-col text-white rounded-xl"
            style={{
              width: "420px",
              height: "300px",
              backgroundColor: "#282828",
            }}
          >
            <div className="w-full h-1/5 flex justify-between p-5">
              <h1 className="font-bold text-xl">Edit details</h1>
              <a
                onClick={() => props.onEditBoxClick(props.editBoxState)}
                className="flex items-center justify-center cursor-pointer"
              >
                <FontAwesomeIcon icon={faTimes} />
              </a>
            </div>
            <div className="w-full h-3/5 px-5 flex justify-between">
              <div className="w-1/2 h-full">
                <img
                  src={podcastDefault}
                  className="w-full h-full bg-gray-700"
                  alt="thumnail"
                />
              </div>
              <div className="w-1/2 h-full pl-5 flex flex-col">
                <div className="relative h-1/5 mb-2">
                  <label
                    className={`absolute opacity-60`}
                    style={{
                      top: "-8px",
                      left: "5px",
                      fontSize: "8px",
                      transition: "opacity .2s",
                    }}
                  >
                    <span>Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    ref={register({ required: true })}
                    className="w-full outline-none rounded-md text-xs px-3"
                    style={{
                      height: "30px",
                      background: "hsla(0,0%,100%,.1)",
                      backgroundColor:
                        "internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59)",
                    }}
                  />
                </div>
                <div className="relative h-1/5 mb-2">
                  <label
                    className={`absolute opacity-60`}
                    style={{
                      top: "-8px",
                      left: "5px",
                      fontSize: "8px",
                      transition: "opacity .2s",
                    }}
                  >
                    <span>Category</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    ref={register({ required: true })}
                    className="w-full outline-none rounded-md text-xs px-3"
                    style={{
                      height: "30px",
                      background: "hsla(0,0%,100%,.1)",
                      backgroundColor:
                        "internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59)",
                    }}
                  />
                </div>
                <div className="relative h-3/5">
                  <label
                    className={`absolute opacity-60`}
                    style={{
                      top: "-8px",
                      left: "5px",
                      fontSize: "8px",
                      transition: "opacity .2s",
                    }}
                  >
                    <span>Description</span>
                  </label>
                  <textarea
                    className="resize-none w-full h-full outline-none rounded-md text-xs p-3"
                    name="description"
                    ref={register}
                    style={{
                      background: "hsla(0,0%,100%,.1)",
                      backgroundColor:
                        "internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59)",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-1/5 px-5 flex justify-between">
              <div className="w-1/2 text-white">
                {updatePodcastMutationResult?.updatePodcast.error && (
                  <FormError
                    errorMessage={
                      updatePodcastMutationResult.updatePodcast.error
                    }
                  />
                )}
              </div>
              <div className="w-1/2 pl-5 flex items-center justify-end">
                <Button
                  canClick={formState.isValid}
                  loading={loading}
                  actionText={"저장하기"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
