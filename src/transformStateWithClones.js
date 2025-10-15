'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_TYPE = 'addProperties';
  const RMV_TYPE = 'removeProperties';
  const CLR_TYPE = 'clear';
  const stateArr = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case ADD_TYPE:
        newState = { ...currentState };

        Object.assign(newState, action.extraData);

        break;

      case RMV_TYPE:
        newState = { ...currentState };

        const keys = action.keysToRemove || [];

        for (const key of keys) {
          delete newState[key];
        }
        break;

      case CLR_TYPE:
        newState = {};
        break;

      default:
        newState = { ...currentState };
    }

    currentState = newState;
    stateArr.push(currentState);
  }

  return stateArr;
}
module.exports = transformStateWithClones;
