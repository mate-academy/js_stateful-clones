'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = Object.assign({}, state);
  const array = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete obj[key];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    }

    array.push(Object.assign({}, obj));
  }

  return array;
}
module.exports = transformStateWithClones;
