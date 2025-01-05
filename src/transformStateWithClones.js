'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    const { type, extraData = {}, keysToRemove = [] } = action;

    switch (type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...extraData };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in stateCopy) {
            delete stateCopy[key];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        continue;
    }
    statesHistory.push(structuredClone(stateCopy));
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
