'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const array = [];

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        Object.assign(copy, elem.extraData);
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      case 'removeProperties':
        for (const key of elem.keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }
        break;

      default:
        return (
          'Pick the right action: addProperties, clear, removeProperties!'
        );
    }

    array.push({ ...copy });
  }

  return (array);
}

module.exports = transformStateWithClones;
