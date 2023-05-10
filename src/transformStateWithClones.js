'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateCopiesArr = [];

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        const extraData = action.extraData;

        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default:
        throw new Error(`${type} doesn't exist`);
    }

    stateCopiesArr.push({ ...stateCopy });
  }

  return stateCopiesArr;
}

module.exports = transformStateWithClones;
