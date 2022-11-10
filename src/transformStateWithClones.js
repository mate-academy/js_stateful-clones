'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
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
        throw Error('no action');
    }
    transformedStates.push({ ...stateClone });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
