const uuid = require('uuid');



import { ADD_TEMPLATE_URL, REMOVE_TEMPLATE_URL } from '../constants/TemplateUrlTypes';

const initialState = [];

export default function urlTemplate(state = initialState, action) {
  switch (action.type) {
    case ADD_TEMPLATE_URL:
    console.log(action.name);
      return [
        ...state,
        { id: uuid.v4(), name: action.name }
      ];

    case REMOVE_TEMPLATE_URL:
      const itemToRemove = state.findIndex(item => item.id === action.id);
      return [
        ...state.slice(0, itemToRemove),
        ...state.slice(itemToRemove + 1, state.length)
      ];

    default:
      return state;
  }
}
