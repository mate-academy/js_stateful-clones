'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateArr = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(currentState, element.extraData);
        break;

      case 'removeProperties':
        for (const keysRemove of element.keysToRemove) {
          delete currentState[keysRemove];
        };
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        };
        break;

      default:
        break;
    }

    stateArr.push({ ...currentState });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
