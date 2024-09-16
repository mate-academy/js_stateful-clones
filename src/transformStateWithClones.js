'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [{ ...state }];

  actions.forEach(action => {
    let newState = { ...stateClones[stateClones.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    stateClones.push(newState);
  });

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
