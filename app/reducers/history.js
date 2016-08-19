const uuid = require('uuid');

import { ADD_HISTORY, REMOVE_HISTORY } from '../constants/HistoryTypes'

const initialState = [];

export default function history(state = initialState, action) {
  switch (action.type) {
    case ADD_HISTORY:
      if (state.findIndex(i =>
        i.season === action.season &&
        i.name === action.name &&
        i.episode === action.episode) !== -1)
        return state;
      return [
        ...state,
        {
          season: action.season,
          episode: action.episode,
          name: action.name,
          id: uuid.v4()
        }
      ];

    case REMOVE_HISTORY:
      const itemToRemove = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, itemToRemove),
        ...state.slice(itemToRemove + 1, state.length)
      ];

    default:
      return state;
  }
}
