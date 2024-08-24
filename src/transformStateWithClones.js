'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const statesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(stateClone, action.extraData);
        break;
      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      case CLEAR:
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    statesArray.push({ ...stateClone });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
