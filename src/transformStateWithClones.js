'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
//
//

function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  const clonedState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(clonedState, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;

      case CLEAR:
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;

      default:
        throw new Error('Your message');
    }
    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
