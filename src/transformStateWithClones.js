'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = [];
  const stateClone = { ...state };
  const ADD_PROPETIES = 'addProperties';
  const REMOVE_PROPETIES = 'removeProperties';
  const CLEAR = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case ADD_PROPETIES:
        Object.assign(stateClone, extraData);
        break;

      case REMOVE_PROPETIES:
        for (const keyRemove of keysToRemove) {
          delete stateClone[keyRemove];
        }
        break;

      case CLEAR:
        for (const keyClone in stateClone) {
          delete stateClone[keyClone];
        }
        break;

      default:
        throw new Error('Unknown action type');
    }

    resultObject.push({ ...stateClone });
  }

  return resultObject;
}

module.exports = transformStateWithClones;
