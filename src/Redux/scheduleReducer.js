import { uploadSchedule } from "../Actions/ReduxActions";
import { changeRound } from "../Actions/ReduxActions";

const initialState = { round: 0 };

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case uploadSchedule:
      return { ...state, schedule: payload };
      break;
    case changeRound:
      return { ...state, round: payload };
    default:
      return state;
  }
}
