'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfResults = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        arrayOfResults.push({ ...copy });
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copy[item];
        }
        arrayOfResults.push({ ...copy });
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        arrayOfResults.push({ ...copy });
        break;

      default:
        return 'Eror';
    }
  }

  return arrayOfResults;
}

module.exports = transformStateWithClones;
