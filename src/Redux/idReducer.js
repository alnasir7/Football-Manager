import { uploadIds } from "../Actions/ReduxActions";

const initialState = [];

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case uploadIds:
      return payload;
    default:
      return state;
  }
}
