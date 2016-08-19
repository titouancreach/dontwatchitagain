import * as ActionTypes from '../constants/TemplateUrlTypes';

export function addTemplateUrl(name) {
  return { type: ActionTypes.ADD_TEMPLATE_URL, name: name };
}

export function removeTemplateUrl(id) {
  return { type: ActionTypes.REMOVE_TEMPLATE_URL, id: id };
}
