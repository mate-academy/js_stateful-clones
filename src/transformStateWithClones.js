'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arrStateAndActions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete stateCopy[property];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    arrStateAndActions.push({ ...stateCopy });
  }

  return arrStateAndActions;
}

module.exports = transformStateWithClones;
