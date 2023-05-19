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

  for (const action of actions) {
    let nextCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        Object.assign(nextCopy, extraData);

        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (nextCopy[key]) {
            delete nextCopy[key];
          }
        }
        break;

      case 'clear':
        nextCopy = {};
        break;
      default:
        return {};
    }

    result.push(nextCopy);
    stateCopy = nextCopy;
  }

  return result;
}
module.exports = transformStateWithClones;
