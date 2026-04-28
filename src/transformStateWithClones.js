'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      stateCopy = {};
    }

    if (action.type === 'addProperties') {
      stateCopy = {
        ...stateCopy,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (const props of action.keysToRemove) {
        delete stateCopy[props];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
