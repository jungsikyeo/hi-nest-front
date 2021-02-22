/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPodcastQuery
// ====================================================

export interface GetAllPodcastQuery_getAllPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  playTime: number | null;
}

export interface GetAllPodcastQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: GetAllPodcastQuery_getAllPodcasts_podcasts_episodes[];
}

export interface GetAllPodcastQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: GetAllPodcastQuery_getAllPodcasts_podcasts[] | null;
}

export interface GetAllPodcastQuery {
  getAllPodcasts: GetAllPodcastQuery_getAllPodcasts;
}
