'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const current of actions) {
    switch (current.type) {
      case 'addProperties':
        Object.assign(newState, current.extraData);

        break;

      case 'removeProperties':
        for (const value of current.keysToRemove) {
          delete newState[value];
        }

        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        break;
    }

    result.push({ ...newState });
  }

  return result;
}
module.exports = transformStateWithClones;
