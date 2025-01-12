'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateArrey = [];

  for (const i of actions) {
    if (i.type === 'addProperties') {
      for (const key in i.extraData) {
        newState[key] = i.extraData[key];
      }
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete newState[key];
      }
    }

    if (i.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    stateArrey.push({ ...newState });
  }

  return stateArrey;
}

module.exports = transformStateWithClones;
