'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
  const stateClone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const ADD_PROPERTIES = 'addProperties';
    const REMOVE_PROPERTIES = 'removeProperties';
    const CLEAR = 'clear';

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(stateClone, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case CLEAR:
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;

      default:
        throw new Error('invalid state');
    }
    transformedState.push({ ...stateClone });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
