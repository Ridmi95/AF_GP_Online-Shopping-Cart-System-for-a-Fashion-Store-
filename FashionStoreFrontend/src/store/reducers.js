// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export type ApplicationState = {};

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
  });
