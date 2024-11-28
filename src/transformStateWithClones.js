'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  const statesArr = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type: actionType, extraData: newData, keysToRemove: rmKeys }
            = action;

    switch (actionType) {
      case CLEAR:
        stateCopy = {};
        break;

      case ADD_PROPERTIES:
        Object.assign(stateCopy, newData);
        break;

      case REMOVE_PROPERTIES:
        for (const rmKey of rmKeys) {
          delete stateCopy[rmKey];
        }
        break;

      default:
        break;
    }

    statesArr.push({ ...stateCopy });
  }

  return statesArr;
}

module.exports = transformStateWithClones;
