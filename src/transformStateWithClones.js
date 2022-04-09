'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const dubState = { ...state };
  const newState = [];

  for (const toDo in actions) {
    if (actions[toDo].type === 'addProperties') {
      for (const key in actions[toDo].extraData) {
        dubState[key] = actions[toDo].extraData[key];
      }
    } else if (actions[toDo].type === 'clear') {
      for (const key in dubState) {
        delete dubState[key];
      }
    } else {
      for (const key in actions[toDo].keysToRemove) {
        delete dubState[actions[toDo].keysToRemove[key]];
      }
    }

    newState.push({ ...dubState });
  }

  return newState;
}

module.exports = transformStateWithClones;
