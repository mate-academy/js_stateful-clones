'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clones = [];
  let currentState = { ...state };

  for (const action of actions) {
    const copyOfState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(copyOfState)) {
          delete copyOfState[key];
        }
        break;
    }

    clones.push(copyOfState);

    currentState = copyOfState;
  }

  return clones;
}

module.exports = transformStateWithClones;
