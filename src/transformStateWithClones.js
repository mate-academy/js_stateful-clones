'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prevVerState = [];
  let stateClone = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case ('addProperties'):
        stateClone = Object.assign(stateClone, action.extraData);
        break;

      case ('removeProperties'):
        action.keysToRemove.forEach((key) => delete stateClone[key]);
        break;

      case ('clear'):
        stateClone = {};
        break;

      default:
        return 'Action undefined';
    }

    prevVerState.push({ ...stateClone });
  });

  return prevVerState;
}

module.exports = transformStateWithClones;
