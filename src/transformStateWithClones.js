'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const current = {
    ...state,
  };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      Object.assign(current, actions[action].extraData);
    }

    if (actions[action].type === 'removeProperties') {
      for (const key of actions[action].keysToRemove) {
        delete current[key];
      }
    }

    if (actions[action].type === 'clear') {
      for (const property in current) {
        delete current[property];
      }
    }

    states.push({
      ...current,
    });
  }

  return states;
}

module.exports = transformStateWithClones;
