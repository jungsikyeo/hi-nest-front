import React, { useState } from "react";
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useLocation } from "react-router-dom";
import spotifyLogoWhite from "../../images/spotify_logo_white.svg";
import { Search } from "../common/search";
import { MyPodcasts } from "./my-podcasts";
import { gql, useMutation, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../../fragments";
import { DetailPodcast } from "./detail-podcast";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import { MyProfile } from "../common/my-profile";

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
  const [createPodcastMutation, { loading }] = useMutation<
    createPodcastMutation,
    createPodcastMutationVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: PODCAST_QUERY }],
  });

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
      <div className="flex flex-col min-h-screen">
        <div className="flex" style={{ minHeight: "calc(100vh - 80px)" }}>
          <div
            id="left"
            className="bg-black text-gray-500"
            style={{ width: "230px", minHeight: "calc(100vh - 80px)" }}
          >
            <div style={{ height: "260px" }}>
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
              <div className="mx-5 py-3">
                <span className="font-bold text-xs text-white text-opacity-50 tracking-wider">
                  플레이리스트
                </span>
              </div>
              <a
                onClick={onCreatePodcast}
                className="flex items-center hover:text-white cursor-pointer mx-5 pb-3 mb-3 border-b border-solid border-gray-500 border-opacity-40"
              >
                <span className="mr-3 bg-gray-100 bg-opacity-30 w-7 h-7 rounded-sm flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlus} className="text-black" />
                </span>
                <span className="text-sm">플레이리스트 만들기</span>
              </a>
            </div>
            <div
              className="overflow-y-scroll"
              style={{ maxHeight: "calc(100vh - 340px)" }}
            >
              <ul className="text-sm px-5">
                {podcasts?.myPodcasts.podcasts?.map((podcast: any) => (
                  <li className="hover:text-white tracking-wider pb-3 overflow-x-hidden overflow-ellipsis whitespace-nowrap">
                    <Link to={`/podcasts/${podcast.id}`} key={podcast.id}>
                      {podcast.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ width: "calc(100vw - 230px)" }}>
            <div
              className="w-full flex text-white px-10 bg-gray-900 bg-opacity-95"
              style={{ height: "60px" }}
            >
              <Search handleOnchange={setSearchText} />
            </div>
            <div
              className="w-full overflow-y-auto bg-gray-900 bg-opacity-90"
              style={{ height: "200px", minHeight: "calc(100vh - 140px)" }}
            >
              {path === "my-profile" && <MyProfile />}
              {path === "podcasts" && (
                <DetailPodcast data={{ podcasts, paramId }} />
              )}
              {path !== "my-profile" && path !== "podcasts" && (
                <MyPodcasts data={podcasts} text={searchText} />
              )}
            </div>
          </div>
        </div>
        <footer className="bg-blue-500 text-white" style={{ height: "80px" }}>
          player
        </footer>
      </div>
    </div>
  );
};
