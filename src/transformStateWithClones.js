'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = { ...state };
  // states.push({ ...stateCopy });
  // const stateHistory = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      // states.push({ ...stateCopy });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    } else if (action.type === 'clear') {
      for (const prop in stateCopy) {
        delete stateCopy[prop];
      }
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
