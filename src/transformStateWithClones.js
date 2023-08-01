'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateIterations = [];
  const stateIteration = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateIteration, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateIteration[key];
        }
        break;

      case 'clear':
        for (const key in stateIteration) {
          delete stateIteration[key];
        }
        break;

      default: break;
    }

    stateIterations.push({ ...stateIteration });
  }

  return stateIterations;
}

module.exports = transformStateWithClones;
