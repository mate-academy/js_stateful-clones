'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newArray = [];
  const newState = { ...state };

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(newState, actions[key].extraData);
      newArray.push({ ...newState });
    } else if (actions[key].type === 'clear') {
      for (const prop in newState) {
        delete newState[prop];
      }
      newArray.push({ ...newState });
    } else if (actions[key].type === 'removeProperties') {
      for (const remProp in actions[key].keysToRemove) {
        delete newState[actions[key].keysToRemove[remProp]];
      }
      newArray.push({ ...newState });
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
