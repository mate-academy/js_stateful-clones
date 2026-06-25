'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        const cellForKey = {};

        for (const key in stateCopy) {
          if (!action.keysToRemove.includes(key)) {
            cellForKey[key] = stateCopy[key];
          }
        }

        stateCopy = cellForKey;
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;
