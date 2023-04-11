'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy, ...extraData,
        };
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          if (stateCopy[value]) {
            delete stateCopy[value];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    const finalCopy = { ...stateCopy };

    result.push(finalCopy);
  }

  return result;
}

module.exports = transformStateWithClones;
