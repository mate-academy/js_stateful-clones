'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          copy[key] = extraData[key];
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
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
    result.push(Object.assign({}, copy));
  }

  return result;
}

module.exports = transformStateWithClones;
