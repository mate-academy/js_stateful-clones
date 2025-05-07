'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateModify = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateModify) {
          delete stateModify[key];
        }
        break;

      case 'addProperties':
        for (const key in action.extraData) {
          stateModify[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateModify[key];
        }
        break;
    }
    states.push({ ...stateModify });
  }

  return states;
}

module.exports = transformStateWithClones;
