'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones({ ...state }, actions) {
  const stateClones = [];

  for (const action of actions) {
    for (const property in action) {
      switch (action[property]) {
        case 'addProperties':
          Object.assign(state, action.extraData);
          break;

        case 'removeProperties':
          for (const key of action.keysToRemove) {
            delete state[key];
          }
          break;

        case 'clear':
          for (const key in state) {
            delete state[key];
          }
          break;
      }
    }

    stateClones.push({ ...state });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
