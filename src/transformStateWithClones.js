'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const statusArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':

        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        copy = {};
        break;
    }
    statusArray.push({ ...copy });
  }

  return statusArray;
}

module.exports = transformStateWithClones;
