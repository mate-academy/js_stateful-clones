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
  const cloneState = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(cloneState, action.extraData);
        transformedStates.push({ ...cloneState });
        break;
      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        transformedStates.push({ ...cloneState });
        break;
      case CLEAR:
        for (const key in cloneState) {
          delete cloneState[key];
        }
        transformedStates.push({});
        break;
      default:
        break;
    }
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
