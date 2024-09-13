'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentCopy = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentCopy = {};
        break;
      case 'addProperties':
        currentCopy = { ...currentCopy, ...action.extraData };
        break;
      case 'removeProperties':
        currentCopy = Object.keys(currentCopy)
          .filter((key) => !action.keysToRemove.includes(key))
          .reduce((newState, key) => {
            newState[key] = currentCopy[key];

            return newState;
          }, {});
        break;
      default:
        return currentCopy;
    }
    statesHistory.push({ ...currentCopy });
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
