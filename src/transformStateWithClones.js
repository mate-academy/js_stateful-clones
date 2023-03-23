'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [Object.assign({}, state)];

  actions.forEach(action => {
    const newState = Object.assign({}, stateClones[stateClones.length - 1]);

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete newState[key];
        });
        break;
      case 'clear':
        Object.keys(newState).forEach(key => {
          delete newState[key];
        });
        break;
      default:
        break;
    }

    stateClones.push(newState);
  });

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
