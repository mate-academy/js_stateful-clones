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
        action.keysToRemove.forEach(key => {
          delete stateIteration[key];
        });
        break;

      case 'clear':
        Object.keys(stateIteration).forEach(key => {
          delete stateIteration[key];
        });
        break;

      default: throw Error('Something went wrong');
    }

    stateIterations.push({ ...stateIteration });
  }

  return stateIterations;
}

module.exports = transformStateWithClones;
