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
  let stateTemp = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateNew = Object.assign(stateNew, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const keyRemoved of action.keysToRemove) {
        delete stateNew[keyRemoved];
      }
    } else if (action.type === 'clear') {
      for (const keyCleared in stateNew) {
        delete stateNew[keyCleared];
      }
    } else {
      continue;
    }

    stateTemp = { ...stateNew };
    arrayResult.push(stateTemp);
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
