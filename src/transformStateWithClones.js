'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      currentState = {};
    } else if (actions[i].type === 'addProperties') {
      currentState = { ...currentState, ...actions[i].extraData };
    } else if (actions[i].type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of actions[i].keysToRemove) {
        delete currentState[key];
      }
      currentState = { ...currentState };
    }
    array.push({ ...currentState });
  }

  return array;
}

module.exports = transformStateWithClones;
