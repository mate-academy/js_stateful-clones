'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [Object.assign({}, state)];

  for (const action of actions) {
    let newState = Object.assign({}, stateClones[stateClones.length - 1]);

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    stateClones.push(newState);
  }

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
