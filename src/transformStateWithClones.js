'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = Object.assign({}, state);
  const finArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const extraData = action.extraData;

        for (const key in extraData) {
          copyState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (copyState.hasOwnProperty(key)) {
            delete copyState[key];
          }
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }
    finArray.push(Object.assign({}, copyState));
  }

  return finArray;
}

module.exports = transformStateWithClones;
