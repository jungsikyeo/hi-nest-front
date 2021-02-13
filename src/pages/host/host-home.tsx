import React, { useState } from "react";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { Search } from "../common/search";
import { MyPodcasts } from "./my-podcasts";
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../../fragments";
import { DetailPodcast } from "./detail-podcast";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";

export interface IUpdatePodcastForm {
  id: number;
  title: string;
  category: string;
  description?: string;
}

export const PODCAST_QUERY = gql`
  query PodcastQuery {
    myPodcasts {
      ok
      error
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;
const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($createPodcastInput: CreatePodcastInput!) {
    createPodcast(input: $createPodcastInput) {
      error
      ok
      id
    }
  }
`;

export const HostHome = () => {
  let { data: podcasts } = useQuery(PODCAST_QUERY);
  const location = useLocation();
  const [, path, paramId] = location.pathname.split("/");
  const [searchText, setSearchText] = useState("");

  const history = useHistory();
  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok, id },
    } = data;
    if (ok) {
      setTimeout(() => {
        history.push(`/podcasts/${id}`);
      }, 1500);
    }
  };
  const [
    createPodcastMutation,
    { loading, data: createPodcastMutationzResult },
  ] = useMutation<createPodcastMutation, createPodcastMutationVariables>(
    CREATE_PODCAST_MUTATION,
    {
      onCompleted,
      refetchQueries: [{ query: PODCAST_QUERY }],
    }
  );

  const onCreatePodcast = () => {
    if (!loading) {
      const index = podcasts?.myPodcasts?.podcasts?.length + 1;
      const title = `내 플레이리스트 #${index}`;
      const category = `미분류`;
      const description = null;

      createPodcastMutation({
        variables: {
          createPodcastInput: { title, category, description },
        },
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-500">
      <Helmet>
        <title>Host | Podcast</title>
      </Helmet>
      <div className="flex bg-black">
        <div
          className="fixed bg-black h-screen px-1"
          style={{ width: "230px" }}
        >
          <div className="pl-5 py-5">
            <Link to="/">
              <img src={spotifyLogoWhite} className="w-32" alt="Spotify" />
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/"
              className={`flex items-center hover:text-white mx-2 py-1 rounded-md ${
                location.pathname === "/" && "bg-gray-800 text-white"
              }`}
            >
              <span className="text-2xl px-3">
                <FontAwesomeIcon icon={faHome} />
              </span>
              <span className="text-sm">홈</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/search"
              className={`flex items-center hover:text-white mx-2 py-1 rounded-md ${
                location.pathname === "/search" && "bg-gray-800 text-white"
              }`}
            >
              <span className="text-2xl px-3">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <span className="text-sm">검색하기</span>
            </Link>
          </div>
          <div className="px-5 pt-5 pb-3">
            <span className="text-xs text-white tracking-wider">팟캐스트</span>
          </div>
          <a
            onClick={onCreatePodcast}
            className="flex items-center hover:text-white cursor-pointer mx-5 pb-3 mb-3 border-b border-solid border-gray-500 border-opacity-40"
          >
            <span className="mr-3 bg-gray-100 bg-opacity-30 w-7 h-7 rounded-sm flex items-center justify-center">
              <FontAwesomeIcon icon={faPlus} className="text-black" />
            </span>
            <span className="text-sm">팟캐스트 만들기</span>
          </a>
          <div className="overflow-auto h-full text-white text-sm flex flex-col">
            {podcasts?.myPodcasts.podcasts?.map((podcast: any) => (
              <Link
                to={`/podcasts/${podcast.id}`}
                key={podcast.id}
                className="tracking-wider pt-3 px-5 overflow-x-hidden overflow-ellipsis whitespace-nowrap"
              >
                {podcast.title}
              </Link>
            ))}
          </div>
        </div>
        <div
          className="w-full h-screen flex bg-black flex-col"
          style={{ paddingLeft: "230px" }}
        >
          <div className="w-full fixed h-14 text-white px-10 bg-gray-900 bg-opacity-95">
            <Search handleOnchange={setSearchText} />
          </div>
          <div className="w-full overflow-y-auto bg-gray-900 bg-opacity-90">
            {path === "podcasts" ? (
              <DetailPodcast data={{ podcasts, paramId }} />
            ) : (
              <MyPodcasts data={podcasts} text={searchText} />
            )}
          </div>
        </div>
      </div>
      <div className="bg-red-500 fixed bottom-0 w-full h-20">player</div>
    </div>
  );
};
