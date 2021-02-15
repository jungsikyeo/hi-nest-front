/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createEpisodeMutation
// ====================================================

export interface createEpisodeMutation_createEpisode {
  __typename: "CreateEpisodeOutput";
  error: string | null;
  ok: boolean;
  id: number | null;
}

export interface createEpisodeMutation {
  createEpisode: createEpisodeMutation_createEpisode;
}

export interface createEpisodeMutationVariables {
  createEpisodeInput: CreateEpisodeInput;
}
