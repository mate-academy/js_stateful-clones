'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        result.push(Object.assign({}, newState, extraData));

        newState = Object.assign({}, newState, extraData);
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          delete newState[value];
        }

        result.push(newState);
        break;

      default:
        result.push({});
        newState = {};
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
