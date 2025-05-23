'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const currentState = { ...state };

  for (const actionsKey in actions) {
    const { type, extraData, keysToRemove } = actions[actionsKey];

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;
      case 'removeProperties':
        for (const keysToRemoveKey in keysToRemove) {
          delete currentState[keysToRemove[keysToRemoveKey]];
        }
        break;
      case 'clear':
        for (const stateKeys in currentState) {
          delete currentState[stateKeys];
        }
        break;
    }
    stateArray.push({ ...currentState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
