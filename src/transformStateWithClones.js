'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyOfState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'removeProperties') {
      for (const key in copyOfState) {
        for (const key1 in actions[i].keysToRemove) {
          if (key === actions[i].keysToRemove[key1]) {
            delete copyOfState[key];
          }
        }
      }
      result.push(Object.assign({}, copyOfState));
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(copyOfState, actions[i].extraData);
      result.push(Object.assign({}, copyOfState));
    }

    if (actions[i].type === 'clear') {
      for (const key in copyOfState) {
        delete copyOfState[key];
      }
      result.push(Object.assign({}, copyOfState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
