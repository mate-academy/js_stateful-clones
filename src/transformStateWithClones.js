'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateCopy = {
        ...stateCopy,
        ...action.extraData,
      };

      stateArray.push({ ...stateCopy });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      stateArray.push({ ...stateCopy });
    }

    if (action.type === 'clear') {
      stateCopy = {};

      stateArray.push(stateCopy);
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
