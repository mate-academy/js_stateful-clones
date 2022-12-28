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

  for (const el of actions) {
    switch (el.type) {
      case 'addProperties':
        Object.assign(currentState, el.extraData);
        break;

      case 'removeProperties':
        for (const keysRemove of el.keysToRemove) {
          delete currentState[keysRemove];
        };
        break;

      case 'clear':
        for (const key in currentState) {
          if (currentState.hasOwnProperty([key])) {
            delete currentState[key];
          }
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
