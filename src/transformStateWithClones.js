'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clones = [];
  const currentState = { ...state };

  for (const action of actions) {
    // const copyOfState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;
    }

    clones.push(...currentState);
  }

  return clones;
}

module.exports = transformStateWithClones;
