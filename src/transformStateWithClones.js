'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statesList = [];
  const copy = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }

        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }

        break;

      default:
        break;
    }
    statesList.push({ ...copy });
  }

  return statesList;
}

module.exports = transformStateWithClones;
