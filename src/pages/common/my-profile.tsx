import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { gql, useQuery } from "@apollo/client";
import { PODCAST_QUERY } from "../host/host-home";
import {PODCAST_FRAGMENT} from "../../fragments";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
    }
  }
`;
export const SUBSCRIPTION_QUERY = gql`
  query SubscriptionsQuery {
    subscriptions {
      ...PodcastParts
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const MyProfile = () => {
  const { data: me } = useQuery(ME_QUERY);
  const callQuery = me?.me.role === "Host" ? PODCAST_QUERY : SUBSCRIPTION_QUERY;
  const { data } = useQuery(callQuery);

  const podcasts =
    me?.me.role === "Host" ? data?.myPodcasts.podcasts : data.subscriptions;

  return (
    <div
      className="w-full py-5 px-10 text-gray-500"
      style={{ minWidth: "500px" }}
    >
      <div className="w-full h-52 flex items-center">
        <div
          className="mb-5 mr-5 flex items-center justify-center bg-black bg-opacity-40 rounded-full items-end shadow-2xl"
          style={{ width: "200px", height: "200px" }}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div className="w-auto mb-5 flex flex-col items-start">
          <span className="text-xs text-white text-opacity-50">프로필</span>
          <span className="text-5xl text-white font-bold py-5">
            {me?.me.email}
          </span>
          <span className="text-sm text-white text-opacity-70">
            {
              `${me?.me.role === "Host" ? `내 플레이리스트 수 :` : `내 구독 수`} ${podcasts.length}`
            }
          </span>
        </div>
      </div>
    </div>
  );
};
