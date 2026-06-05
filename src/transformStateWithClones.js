'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const result = [];

  for (const obj in actions) {
    for (const property in actions[obj]) {
      if (actions[obj][property] === 'addProperties') {
        for (const key in actions[obj].extraData) {
          clonedState[key] = actions[obj].extraData[key];
        }
      }

      if (actions[obj][property] === 'removeProperties') {
        for (const key of actions[obj].keysToRemove) {
          delete clonedState[key];
        }
      }

      if (actions[obj][property] === 'clear') {
        for (const key in clonedState) {
          delete clonedState[key];
        }
      }
    }

    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
