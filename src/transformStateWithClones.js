'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let listOfStates = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        listOfStates.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        listOfStates.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        listOfStates.push({ ...newState });
        break;

      default:
        return null;
    }
  }

  return listOfStates;
}

module.exports = transformStateWithClones;
