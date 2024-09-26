'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];

  let stateCopy = { ...state };

  const ADD_ACTION = 'addProperties';
  const REMOVE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_ACTION:
        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case REMOVE_ACTION:
        stateCopy = { ...stateCopy };

        keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case CLEAR_ACTION:
        stateCopy = {};
        break;

      default:
        throw new Error(`Action error: ${type}`);
    }

    cloneState.push(stateCopy);
  }

  return cloneState;
}

module.exports = transformStateWithClones;
