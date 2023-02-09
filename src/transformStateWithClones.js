'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const { extraData, keysToRemove, type } of actions) {
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
        throw new Error('Wrong type of action!');
    }

    result.push(Object.assign({}, newState));
  }

  return result;
}

module.exports = transformStateWithClones;
