import * as ActionTypes from '../constants/HistoryTypes.js';
import escapeRegExp from '../utils/escapereg';

export function addHistory(name, season, episode) {
  return {type: ActionTypes.ADD_HISTORY, name: name, episode: episode, season: season};
}

export function removeHistory(id) {
  return {type: ActionTypes.REMOVE_HISTORY, id: id};
}
