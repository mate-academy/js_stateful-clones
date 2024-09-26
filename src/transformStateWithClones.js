'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArr = [];
  let clonedState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          clonedState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        clonedState = {};
        break;

      default:

        break;
    }
    statesArr.push({ ...clonedState });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
