'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(newState, key.extraData);
        break;

      case 'removeProperties':
        for (const keyToDel of key.keysToRemove) {
          delete newState[keyToDel];
        }
        break;

      case 'clear':
        for (const keyNewState in newState) {
          delete newState[keyNewState];
        }
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
