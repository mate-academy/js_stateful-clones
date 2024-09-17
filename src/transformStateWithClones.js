'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newState = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const del of keysToRemove) {
          delete copyState[del];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    newState.push({ ...copyState });
  }

  return newState;
}

module.exports = transformStateWithClones;
