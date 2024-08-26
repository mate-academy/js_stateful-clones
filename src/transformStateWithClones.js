'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArray = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
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
        stateCopy = {};
    }
    resArray.push({ ...stateCopy });
  }

  return resArray;
}

module.exports = transformStateWithClones;
