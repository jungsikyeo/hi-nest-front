/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PodcastQuery
// ====================================================

export interface PodcastQuery_myPodcasts_podcasts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
  imageUrl: string | null;
  playTime: number | null;
}

export interface PodcastQuery_myPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  description: string | null;
  episodes: PodcastQuery_myPodcasts_podcasts_episodes[];
}

export interface PodcastQuery_myPodcasts {
  __typename: "MyPodcastOutput";
  ok: boolean;
  error: string | null;
  podcasts: PodcastQuery_myPodcasts_podcasts[];
}

export interface PodcastQuery {
  myPodcasts: PodcastQuery_myPodcasts;
}
