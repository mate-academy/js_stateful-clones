'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        for (const prop in clonedState) {
          delete clonedState[prop];
        }
        break;
    }

    resultArray.push({ ...clonedState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
