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
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = Object.assign(
          {}, stateClones[stateClones.length - 1], action.extraData
        );
        break;
      case 'removeProperties':
        newState = Object.assign({}, stateClones[stateClones.length - 1]);

        action.keysToRemove.forEach(key => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Invalid action type: ${action.type}`);
    }
    stateClones.push(newState);
  });

  return stateClones.slice(1);
}

module.exports = transformStateWithClones;
