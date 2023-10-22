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
          addObjectStateToArray(stateClones, state);
          break;

        case 'removeProperties':
          for (const key of action.keysToRemove) {
            delete state[key];
          }
          addObjectStateToArray(stateClones, state);
          break;

        case 'clear':
          for (const key in state) {
            delete state[key];
          }
          addObjectStateToArray(stateClones, state);
          break;
      }
    }
  }

  return stateClones;
}

function addObjectStateToArray(arr, obj) {
  arr.push({ ...obj });
}

module.exports = transformStateWithClones;
