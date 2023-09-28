'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error('add correct state');
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
