'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  const stateCopy = { ...state };

  for (const type of actions) {
    if (type.type === 'addProperties') {
      for (const key in type.extraData) {
        stateCopy[key] = type.extraData[key];
      }
      states.push({ ...stateCopy });
    }

    if (type.type === 'removeProperties') {
      for (const key of type.keysToRemove) {
        delete stateCopy[key];
      }
      states.push({ ...stateCopy });
    }

    if (type.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      states.push({ ...stateCopy });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
