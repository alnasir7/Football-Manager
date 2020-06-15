import { combineReducers } from "redux";
import statsReducer from "./StatsReducer";
import scheduleReducer from "./scheduleReducer";

export default combineReducers({
  statsReducer,
  scheduleReducer,
});
