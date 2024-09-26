'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const stateClone = { ...state };
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD:
        Object.assign(stateClone, action.extraData);
        break;

      case REMOVE:
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        }
        break;

      case CLEAR:
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      default:
        throw Error('There is no such action');
    }
    stateArray.push({ ...stateClone });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
