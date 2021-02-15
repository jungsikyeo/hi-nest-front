/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPodcasts
// ====================================================

export interface GetAllPodcasts_getAllPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
}

export interface GetAllPodcasts_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: GetAllPodcasts_getAllPodcasts_podcasts_episodes[];
}

export interface GetAllPodcasts_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: GetAllPodcasts_getAllPodcasts_podcasts[] | null;
}

export interface GetAllPodcasts_subscriptions_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
}

export interface GetAllPodcasts_subscriptions {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: GetAllPodcasts_subscriptions_episodes[];
}

export interface GetAllPodcasts {
  getAllPodcasts: GetAllPodcasts_getAllPodcasts;
  subscriptions: GetAllPodcasts_subscriptions[];
}
