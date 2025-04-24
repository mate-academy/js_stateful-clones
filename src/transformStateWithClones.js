'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let newState = { ...state };

  for (const action of actions) {
    let nextState = { ...newState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        continue;
    }

    clones.push(nextState);
    newState = nextState;
  }

  return clones;
}

module.exports = transformStateWithClones;
