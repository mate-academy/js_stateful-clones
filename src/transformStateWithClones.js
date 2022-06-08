'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayOfStates = [];
  const cloneState = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const remove of keysToRemove) {
          if (cloneState.hasOwnProperty(remove)) {
            delete cloneState[remove];
          }
        }
        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;

      default:
        break;
    }

    arrayOfStates.push({ ...cloneState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
