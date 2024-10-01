'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const finalState = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete stateCopy[action.keysToRemove[i]];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    finalState.push(Object.assign({}, stateCopy));
  }

  return finalState;
}

module.exports = transformStateWithClones;
