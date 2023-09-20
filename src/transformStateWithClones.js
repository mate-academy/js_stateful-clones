'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {

  const statesAfterActionsArray = [];
  const stateCopy = Object.assign({}, state);
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD:
        Object.assign(stateCopy, extraData);
        break;
      case REMOVE:
        for (const keyToRemove of keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      case CLEAR:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error('Invalid action');
    };
    statesAfterActionsArray.push({ ...stateCopy });
  };

  return statesAfterActionsArray;
}

module.exports = transformStateWithClones;
