'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];

  let lastState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(lastState, actions[i].extraData);
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete lastState[key];
        }
        break;
      case 'clear':
        lastState = {};
        break;
    }
    clone.push({ ...lastState });
  }

  return clone;
}

module.exports = transformStateWithClones;
