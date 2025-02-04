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
    let newState = { ...currentState };

    if (actions[i].type === 'addProperties') {
      newState = { ...newState, ...actions[i].extraData };
    }

    if (actions[i].type === 'removeProperties') {
      actions[i].keysToRemove.forEach((key) => delete newState[key]);
    }

    if (actions[i].type === 'clear') {
      newState = {};
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
