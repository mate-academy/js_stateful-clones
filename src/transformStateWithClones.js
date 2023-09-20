'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const TYPE_VALUE_CLEAR = 'clear';
  const TYPE_VALUE_REMOVE_PROPERTIES = 'removeProperties';
  const TYPE_VALUE_ADD_PROPERTIES = 'addProperties';
  const clonedStates = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case TYPE_VALUE_ADD_PROPERTIES:
        Object.assign(newState, extraData);
        break;
      case TYPE_VALUE_REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case TYPE_VALUE_CLEAR:
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    clonedStates.push({ ...newState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
