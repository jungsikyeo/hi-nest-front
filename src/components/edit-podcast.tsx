import React, { useState } from "react";
import podcastDefault from "../images/podcast_default.svg";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import { FormError } from "./form-error";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../__generated__/updatePodcastMutation";

interface IPodcast {
  id: number;
  title: string;
  category: string;
  description: string;
  episodes: any;
}

interface IUpdatePodcastForm {
  id: number;
  title: string;
  category: string;
  description?: string;
}

const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($updatePodcastInput: UpdatePodcastInput!) {
    updatePodcast(input: $updatePodcastInput) {
      error
      ok
    }
  }
`;

export const EditPodcast = (props: any) => {
  const podcast: IPodcast = props.data.podcasts?.myPodcasts.podcasts.find(
    (podcast: IPodcast) => podcast.id === +props.data.paramId
  );

  const { register, getValues, errors, handleSubmit, formState } = useForm<
    IUpdatePodcastForm
  >({
    mode: "onChange",
    defaultValues: {
      title: podcast.title,
      category: podcast.category,
      description: podcast.description,
    },
  });
  const history = useHistory();
  const location = useLocation();
  const onCompleted = (data: updatePodcastMutation) => {
    const {
      updatePodcast: { ok },
    } = data;
    if (ok) {
      history.push(location.pathname);
    }
  };
  const [
    updatePodcastMutation,
    { loading, data: updatePodcastMutationResult },
  ] = useMutation<updatePodcastMutation, updatePodcastMutationVariables>(
    UPDATE_PODCAST_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { id, title, category, description } = getValues();
      updatePodcastMutation({
        variables: {
          updatePodcastInput: { id, title, category, description },
        },
      });
    }
  };
  const [editBoxState, setEditBoxState] = useState(false);
  const onEditBoxClick = () =>
    setEditBoxState((editBoxState) => (editBoxState = !editBoxState));
  return (
    <div className="w-full h-auto mb-32 pt-20 px-10">
      <div className="w-full h-64 flex items-end">
        <div className="mb-5 mr-5 flex items-end shadow-2xl">
          <img
            src={podcastDefault}
            className="w-48 h-48 bg-gray-700"
            alt="podcast default"
          />
        </div>
        <div className="mb-5 flex flex-col items-start">
          <span className="text-sm text-white text-opacity-50">
            {podcast?.category}
          </span>
          <span className="text-5xl text-white font-bold pt-1 pb-2">
            <a onClick={onEditBoxClick} className="cursor-pointer">
              {podcast?.title}
            </a>
          </span>
          <span className="text-sm text-white text-opacity-70">
            {podcast?.description}
          </span>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="flex flex-col">
            <section
              className="grid gap-4 grid-cols-4 text-xs h-15 border-b border-solid border-gray-700 border-opacity-50 pb-2"
              style={{
                gridTemplateColumns:
                  "[index] 16px [first] 6fr [var1] 4fr [last] minmax(120px,1fr)",
              }}
            >
              <span className="pl-5">#</span>
              <span>제목</span>
              <span>앨범</span>
              <span>재생시간</span>
            </section>
            {podcast?.episodes.map((episode: any, index: number) => (
              <section
                key={episode.id}
                className={`
                  grid gap-4 grid-cols-4 
                  h-15 
                  text-sm 
                  hover:border hover:border-gray-500 hover:border-opacity-90 
                  hover:bg-gray-500 hover:bg-opacity-20 rounded-md pl-5 py-2 ${
                    index === 0 ? `mt-5` : ``
                  }`}
                style={{
                  gridTemplateColumns:
                    "[index] 16px [first] 6fr [var1] 4fr [last] minmax(120px,1fr)",
                }}
              >
                <span className="flex items-center">{++index}</span>
                <div className="flex items-center">
                  {episode.imageUrl ? (
                    <img
                      src={episode.imageUrl}
                      className="w-10 h-10"
                      alt="thumnail"
                    />
                  ) : (
                    <img
                      src={podcastDefault}
                      className="w-10 h-10 bg-gray-700"
                      alt="thumnail"
                    />
                  )}
                  <span className="text-white pl-3">{episode.title}</span>
                </div>
                <span className="flex items-center">{episode.category}</span>
                <span className="flex items-center">3:00</span>
              </section>
            ))}
          </div>
        </div>
      </div>
      {editBoxState && (
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-screen">
          <div className="w-full h-screen bg-black bg-opacity-80"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={podcast.id} />
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
                    onClick={onEditBoxClick}
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
                  <div className="w-7/12 bg-blue-500">
                    {errors.title?.message && (
                      <FormError errorMessage={errors.title?.message} />
                    )}
                    {errors.category?.message && (
                      <FormError errorMessage={errors.category?.message} />
                    )}
                    {updatePodcastMutationResult?.updatePodcast.error && (
                      <FormError
                        errorMessage={
                          updatePodcastMutationResult.updatePodcast.error
                        }
                      />
                    )}
                  </div>
                  <div className="w-auto flex items-center justify-end bg-red-500">
                    <Button
                      canClick={formState.isValid}
                      loading={loading}
                      actionText={"저장하기"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
