/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface ChangeSubscribeInput {
  podcastId: number;
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  category: string;
  imageUrl?: string | null;
  playTime?: number | null;
  playId?: string | null;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: string;
  description?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface UpdatePodcastInput {
  id: number;
  title: string;
  category: string;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
