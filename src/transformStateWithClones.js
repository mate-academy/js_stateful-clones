'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = {
    ...state,
  };
  const statesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[`${key}`];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    statesArray.push({ ...stateCopy });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
