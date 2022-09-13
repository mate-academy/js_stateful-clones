'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
  const transformedStateWithClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const removedKey of action.keysToRemove) {
          delete modifiedState[removedKey];
        }
        break;

      case 'clear':
        for (const clearedKey in modifiedState) {
          delete modifiedState[clearedKey];
        }
        break;
    }

    transformedStateWithClones.push({ ...modifiedState });
  }

  return transformedStateWithClones;
}

module.exports = transformStateWithClones;
