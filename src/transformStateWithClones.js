'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {};

  Object.assign(stateCopy, state);

  const modificationsHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);

      const statesArray = { ...stateCopy };

      modificationsHistory.push(statesArray);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      const statesArray = { ...stateCopy };

      modificationsHistory.push(statesArray);
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }

      const statesArray = { ...stateCopy };

      modificationsHistory.push(statesArray);
    }
  }

  return modificationsHistory;
}

module.exports = transformStateWithClones;
