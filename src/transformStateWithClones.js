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
        newState = Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    stateClones.push(newState);
  }
  stateClones.shift();

  return stateClones;
}

module.exports = transformStateWithClones;
