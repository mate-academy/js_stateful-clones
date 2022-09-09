'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  let previousState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(previousState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete previousState[key];
        }
        break;
      case 'clear':
        for (const key in previousState) {
          delete previousState[key];
        }
        break;
    }
    resultArr.push({ ... previousState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
