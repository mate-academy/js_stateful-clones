'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const statesCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(statesCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete statesCopy[key];
        }
        break;

      case 'clear':
        for (const key in statesCopy) {
          delete statesCopy[key];
        }
    }

    states.push({ ...statesCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
