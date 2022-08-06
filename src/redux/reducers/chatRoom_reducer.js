import { SET_CURRENT_CHAT_ROOM } from '../actions/types';

const initialChatRoomState = {};

export default function user(state = initialChatRoomState, action) {
  switch (action.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
      };
    default:
      return state;
  }
}
