'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES_TYPE = 'addProperties';
  const REMOVE_PROPERTIES_TYPE = 'removeProperties';
  const CLEAR_TYPE = 'clear';

  const clonesArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES_TYPE:
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case REMOVE_PROPERTIES_TYPE:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR_TYPE:
        stateCopy = {};
        break;
    }
    clonesArray.push({ ...stateCopy });
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
