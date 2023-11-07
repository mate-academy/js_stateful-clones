'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const modifiedState = { ...state };
  const resultArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(modifiedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete modifiedState[key];
        };
        break;

      case 'clear':
        for (const key in modifiedState) {
          delete modifiedState[key];
        }
        break;
    }
    resultArray.push({ ...modifiedState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
