'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateArray = [];
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case ADD_PROPERTIES:
        stateCopy = {
          ...stateCopy,
          ...actions[i].extraData,
        };
        break;

      case REMOVE_PROPERTIES:
        for (const item of actions[i].keysToRemove) {
          delete stateCopy[item];
        }
        break;

      case CLEAR:
        stateCopy = {};
        break;
    }

    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
