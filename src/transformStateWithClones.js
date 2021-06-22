'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const transformState = [];

  for (const char of actions) {
    if (char.type === 'addProperties') {
      Object.assign(stateClone, char.extraData);
    }

    if (char.type === 'removeProperties') {
      for (const key of char.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (char.type === 'clear') {
      for (const key of Object.keys(stateClone)) {
        delete stateClone[key];
      }
    }

    transformState.push({ ...stateClone });
  }

  return transformState;
}

module.exports = transformStateWithClones;
