/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { addSubject, addSubjectFail, addSubjectSuccess, loadSubjects, loadSubjectsFail, loadSubjectsSuccess } from './action';

export interface CollectionEntityState {
  isPending: boolean;
  subjects: string[];
}

const initialState: CollectionEntityState = {
  isPending: false,
  subjects: null,
};

const reducer: ActionReducer<CollectionEntityState> = createReducer(
  initialState,
  on(loadSubjects, addSubject, state => ({ ...state, isPending: true })),
  on(loadSubjectsFail, addSubjectFail, state => ({ ...state, isPending: false })),
  on(loadSubjectsSuccess, (state, { subjects }) => ({ ...state, isPending: false, subjects })),
  on(addSubjectSuccess, (state, { subject }) => ({ ...state, isPending: false, subjects: [...state.subjects, subject] }))
);

export const collectionReducer = (modelState: CollectionEntityState, action: Action) => reducer(modelState, action);
