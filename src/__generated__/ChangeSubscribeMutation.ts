/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangeSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ChangeSubscribeMutation
// ====================================================

export interface ChangeSubscribeMutation_changeSubscribe {
  __typename: "ChangeSubscribeOutput";
  error: string | null;
  ok: boolean;
}

export interface ChangeSubscribeMutation {
  changeSubscribe: ChangeSubscribeMutation_changeSubscribe;
}

export interface ChangeSubscribeMutationVariables {
  input: ChangeSubscribeInput;
}
