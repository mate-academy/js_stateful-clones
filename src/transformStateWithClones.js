'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const allStates = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties' :
        stateClone = {
          ...stateClone,
          ...(action.extraData),
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        };
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('Error');
    };

    allStates.push({ ...stateClone });
  });

  return allStates;
}

module.exports = transformStateWithClones;
