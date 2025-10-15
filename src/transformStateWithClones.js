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

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case CLR_TYPE:
        newState = {};
        break;
    }
    currentState = newState;
    stateArr.push(currentState);
  }

  return stateArr;
}

module.exports = transformStateWithClones;
