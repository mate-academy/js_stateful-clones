'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const act of action.keysToRemove) {
          delete currentState[act];
        }
    }

    resultArr.push({ ...currentState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
