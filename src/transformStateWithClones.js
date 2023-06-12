'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    let newState = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...newState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    resultArray.push(newState);
    stateCopy = newState;
  }

  return resultArray;
}

module.exports = transformStateWithClones;
