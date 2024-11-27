'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  let stateNew = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateNew = Object.assign(stateNew, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemoved of action.keysToRemove) {
          delete stateNew[keyRemoved];
        };
        break;

      case 'clear':
        for (const keyCleared in stateNew) {
          delete stateNew[keyCleared];
        };
        break;

      default:
        continue;
    }

    arrayResult.push({ ...stateNew });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
