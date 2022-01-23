'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArr = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);

        stateArr.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        stateArr.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        stateArr.push({ ...stateCopy });
        break;

      default:
        break;
    }
  }

  return stateArr;
}

module.exports = transformStateWithClones;
