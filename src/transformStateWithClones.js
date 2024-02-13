'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete stateCopy[action.keysToRemove[j]];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
