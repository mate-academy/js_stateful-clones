'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const temporaryObject = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(temporaryObject, actions[i].extraData);
      stateArray.push({ ...temporaryObject });
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete temporaryObject[key];
      }

      stateArray.push({ ...temporaryObject });
    }

    if (actions[i].type === 'clear') {
      for (const key in temporaryObject) {
        delete temporaryObject[key];
      }

      stateArray.push({ ...temporaryObject });
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
