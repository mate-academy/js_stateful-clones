'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateCopy = Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (stateCopy.hasOwnProperty(key)) {
          delete stateCopy[key];
        }
      }
    }

    if (action.type === 'clear') {
      stateCopy = {};
    }

    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;
