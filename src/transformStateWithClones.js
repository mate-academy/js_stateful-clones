'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (key in stateCopy) {
          delete stateCopy[key];
        }
      }
    }

    if (action.type === 'clear') {
      stateCopy = {};
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
