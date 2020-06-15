import { uploadTeams } from "../Actions/ReduxActions";
import { updateTeam } from "../Actions/ReduxActions";

const initialState = [];

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case uploadTeams:
      return payload;
      break;

    case updateTeam:
      const { id, prop, propData } = payload;
      const newTeam = {
        ...[...state].filter((item, index) => index === id)[0],
      };
      newTeam[prop] = propData;
      return state.map((item, index) => (index === id ? newTeam : item));

      break;

    default:
      return state;
  }
}