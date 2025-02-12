'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const stateCopy = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
    } else if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    history.push(stateCopy);
    currentState = stateCopy;
  }

  return history;
}

module.exports = transformStateWithClones;
