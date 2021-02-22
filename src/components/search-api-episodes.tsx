import React from "react";
import podcastDefault from "../images/podcast_default.svg";
import { useHistory, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { PODCAST_QUERY } from "../pages/host/host-home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  notifyInfo,
  notifySuccess,
} from "../pages/listener/detail-subscription";
import {
  createEpisodeMutation,
  createEpisodeMutationVariables,
} from "../__generated__/createEpisodeMutation";

export interface IEpisode {
  podcastId: number;
  title: string;
  category: string;
  imageUrl?: string;
  playTime?: number;
  playId: string;
}

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutation($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      error
      ok
      id
    }
  }
`;

export const SearchApiEpisodes = (props: any) => {
  const episode = props.data.episode;
  const index = props.data.index + 1;

  const location = useLocation();
  const history = useHistory();
  const podcastId = +location.pathname.replace("/podcasts/", "");
  const onCompleted = (data: createEpisodeMutation) => {
    const {
      createEpisode: { ok },
    } = data;
    if (ok) {
      notifySuccess(
        <div className={`text-sm`}>플레이리스트에 추가되었습니다.</div>
      );
      setTimeout(() => {
        history.push(`/podcasts/${podcastId}`);
      }, 1500);
    }
  };
  const [createEpisodeMutation, { loading }] = useMutation<
    createEpisodeMutation,
    createEpisodeMutationVariables
  >(CREATE_EPISODE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: PODCAST_QUERY }],
  });

  const onCreateEpisode = () => {
    if (!loading) {
      const title = episode.title;
      const category = episode.category;
      const imageUrl = episode.imageUrl;
      const playTime = episode.playTime;
      const playId = episode.playId;

      notifyInfo(<div className={`text-sm`}>플레이리스트에 추가합니다.</div>);

      createEpisodeMutation({
        variables: {
          createEpisodeInput: {
            podcastId,
            title,
            category,
            imageUrl,
            playTime,
            playId,
          },
        },
      });
    }
  };

  return (
    <section
      key={episode?.id}
      className={`
                  grid gap-4 grid-cols-5 
                  h-15 
                  text-sm 
                  hover:border hover:border-gray-500 hover:border-opacity-90 
                  hover:bg-gray-500 hover:bg-opacity-20 rounded-md pl-5 py-2 ${
                    index === 0 ? `mt-5` : ``
                  }`}
      style={{
        gridTemplateColumns:
          "[index] 16px [first] 6fr [var1] 4fr [var2] minmax(120px,1fr) [last] 2fr",
      }}
    >
      <span className="flex items-center">{index}</span>
      <div className="flex items-center">
        {episode?.imageUrl ? (
          <img src={episode?.imageUrl} className="w-10 h-10" alt="thumnail" />
        ) : (
          <img
            src={podcastDefault}
            className="w-10 h-10 bg-gray-700"
            alt="thumnail"
          />
        )}
        <span className="text-white pl-3">{episode?.title}</span>
      </div>
      <span className="flex items-center">{episode?.category}</span>
      <span className="flex items-center">{`${
        episode?.playTime
          ? `${Math.floor(episode?.playTime / 60000)}:${(
              episode?.playTime % 60000
            )
              .toString()
              .substring(0, 2)}`
          : ``
      }`}</span>
      <div className="flex items-center">
        <div
          className="border border-gray-600 rounded-3xl hover:border-white hover:bg-gray-900 cursor-pointer flex items-center justify-center"
          style={{ width: "120px", height: "35px" }}
        >
          <a onClick={onCreateEpisode}>
            <span className="text-white text-xs font-bold">추가하기</span>
          </a>
          {index === 1 && (
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          )}
        </div>
      </div>
    </section>
  );
};
