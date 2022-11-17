'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArray = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete stateCopy[keys];
        }
    }
    stateArray.push({ ...stateCopy });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
