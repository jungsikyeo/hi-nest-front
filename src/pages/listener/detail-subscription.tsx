import React from "react";
import podcastDefault from "../../images/podcast_default.svg";
import { Episodes } from "../../components/episodes";
import playIcon from "../../images/play.svg";
import { gql, useMutation } from "@apollo/client";
import { GET_ALL_PODCASTS_QUERY } from "./listener-home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ChangeSubscribeMutation,
  ChangeSubscribeMutationVariables,
} from "../../__generated__/ChangeSubscribeMutation";
import { IEpisode } from "../../components/search-api-episodes";
import { Thumbnail } from "../../components/thumbnail";

export interface IPodcast {
  id: number;
  title: string;
  category: string;
  description: string;
  episodes: any;
}

const CHANGE_SUBSCRIBE_MUTATION = gql`
  mutation ChangeSubscribeMutation($input: ChangeSubscribeInput!) {
    changeSubscribe(input: $input) {
      error
      ok
    }
  }
`;

export const notifyInfo = (notifyMessage: any) => {
  toast.info(notifyMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifySuccess = (notifyMessage: any) => {
  toast.success(notifyMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const notifyError = (notifyMessage: any) => {
  toast.error(notifyMessage, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const DetailSubscription = (props: any) => {
  const podcast: IPodcast = props.data.podcasts?.getAllPodcasts.podcasts.find(
    (podcast: IPodcast) => podcast.id === +props.data.paramId
  );
  const subscription: IPodcast = props.data.podcasts?.subscriptions.find(
    (podcast: IPodcast) => podcast.id === +props.data.paramId
  );

  const onCompleted = (data: ChangeSubscribeMutation) => {
    const {
      changeSubscribe: { ok },
    } = data;
    if (ok) {
      let notifyMessage = (
        <div className={`text-sm`}>
          {subscription ? "구독을 취소하였습니다." : "구독중입니다."}
        </div>
      );
      notifySuccess(notifyMessage);
    }
  };
  const [changeSubscribeMutation, { loading }] = useMutation<
    ChangeSubscribeMutation,
    ChangeSubscribeMutationVariables
  >(CHANGE_SUBSCRIBE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: GET_ALL_PODCASTS_QUERY }],
  });
  const onChangeSubscription = () => {
    if (!loading) {
      let notifyMessage = (
        <div className={`text-sm`}>
          {subscription ? "구독을 취소중입니다." : "구독 신청중입니다."}
        </div>
      );
      subscription ? notifyError(notifyMessage) : notifyInfo(notifyMessage);
      const podcastId: number = podcast.id;
      changeSubscribeMutation({
        variables: {
          input: { podcastId },
        },
      });
    }
  };
  return (
    <div
      className="w-full py-5 px-10 text-gray-500"
      style={{ minWidth: "500px" }}
    >
      <div className="w-full h-52 flex items-end">
        <Thumbnail data={podcast} />
        <div className="w-auto mb-5 flex flex-col items-start">
          <span className="text-sm text-white text-opacity-50">
            {podcast?.category}
          </span>
          <span className="text-5xl text-white font-bold pt-1 pb-2">
            {podcast?.title}
          </span>
          <span className="text-sm text-white text-opacity-70">
            {podcast?.description}
          </span>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="flex flex-col">
            <section className="h-15 text-2xl text-white font-medium py-7">
              <div className="flex">
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-full"
                  style={{ backgroundColor: "#1db954" }}
                >
                  <img src={playIcon} alt="play" />
                </div>
                {subscription ? (
                  <div
                    className="flex items-center justify-center w-14 h-14 ml-5"
                    style={{ color: "#1db954" }}
                  >
                    <button
                      onClick={onChangeSubscription}
                      className="outline-none focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32"
                        width="32"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M27.319 5.927a7.445 7.445 0 00-10.02-.462s-.545.469-1.299.469c-.775 0-1.299-.469-1.299-.469a7.445 7.445 0 00-10.02 10.993l9.266 10.848a2.7 2.7 0 004.106 0l9.266-10.848a7.447 7.447 0 000-10.531z"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-14 h-14 ml-5 text-white text-opacity-50 hover:text-opacity-100">
                    <button
                      onClick={onChangeSubscription}
                      className="outline-none focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32"
                        width="32"
                        viewBox="0 0 32 32"
                        fill="currentColor"
                      >
                        <path d="M27.672 5.573a7.904 7.904 0 00-10.697-.489c-.004.003-.425.35-.975.35-.564 0-.965-.341-.979-.354a7.904 7.904 0 00-10.693.493A7.896 7.896 0 002 11.192c0 2.123.827 4.118 2.301 5.59l9.266 10.848a3.196 3.196 0 004.866 0l9.239-10.819A7.892 7.892 0 0030 11.192a7.896 7.896 0 00-2.328-5.619zm-.734 10.56l-9.266 10.848c-.837.979-2.508.979-3.346 0L5.035 16.104A6.9 6.9 0 013 11.192 6.9 6.9 0 015.035 6.28a6.935 6.935 0 014.913-2.048 6.89 6.89 0 014.419 1.605A2.58 2.58 0 0016 6.434c.914 0 1.555-.53 1.619-.585a6.908 6.908 0 019.346.431C28.277 7.593 29 9.337 29 11.192s-.723 3.6-2.062 4.941z"></path>
                      </svg>
                    </button>
                  </div>
                )}

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
              </div>
            </section>
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
              <Episodes data={{ episode, index }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
