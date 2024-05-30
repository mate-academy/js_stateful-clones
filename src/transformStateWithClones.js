'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifyState = { ...state };

  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const entry of Object.entries(action.extraData)) {
          modifyState[entry[0]] = entry[1];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifyState[key];
        }
        break;
      case 'clear':
        for (const key of Object.keys(modifyState)) {
          delete modifyState[key];
        }
        break;
    }
    result.push({ ...modifyState });
  }

  return result;
}

module.exports = transformStateWithClones;
