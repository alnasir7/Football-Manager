import { uploadTeams } from "../Actions/ReduxActions";
import { updateTeam } from "../Actions/ReduxActions";
import { replaceTeam } from "../Actions/ReduxActions";

const initialState = [];

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case uploadTeams:
      return payload;
      break;

    case replaceTeam:
      const { id, newTeam } = payload;
      console.log(payload);
      return state.map((item) => (item.id === id ? newTeam : item));
      break;

    default:
      return state;
  }
}
