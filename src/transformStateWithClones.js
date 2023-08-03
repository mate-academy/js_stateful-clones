'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneArray = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key =>
          delete stateClone[key]);
        break;

      case 'clear':
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;

      default:
        throw new Error('Something went wrong!');
    }

    cloneArray.push({ ...stateClone });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
