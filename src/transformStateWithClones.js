'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const mutableState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(mutableState, action.extraData);
        break;

      case 'clear':
        for (const key in mutableState) {
          delete mutableState[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete mutableState[key];
        }
    }
    result.push({ ...mutableState });
  }

  return result;
}

module.exports = transformStateWithClones;
