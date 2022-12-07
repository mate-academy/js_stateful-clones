'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const _state = { ...state };
  const states = [];

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        Object.assign(_state, actions[action].extraData);
        break;
      case 'removeProperties':
        for (const key of actions[action].keysToRemove) {
          delete _state[key];
        }
        break;
      case 'clear':
        for (const key in _state) {
          delete _state[key];
        }
        break;
    }
    states.push({ ..._state });
  }

  return states;
}

module.exports = transformStateWithClones;
