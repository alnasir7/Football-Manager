import { combineReducers } from "redux";
import statsReducer from "./StatsReducer";
import scheduleReducer from "./scheduleReducer";
import idReducer from "./idReducer";

export default combineReducers({
  statsReducer,
  scheduleReducer,
  idReducer,
});
