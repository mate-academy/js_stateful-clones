'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let stateCopy = { ...state };

  const ADD_PROP = 'addProperties';
  const REMOVE_PROP = 'removeProperties';
  const CLEAR_PROP = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROP:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE_PROP:
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case CLEAR_PROP:
        stateCopy = {};
        break;
    }

    resultArr.push({ ...stateCopy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
