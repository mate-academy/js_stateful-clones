'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentCopy = {};

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        if (!i) {
          currentCopy = { ...Object.assign({}, state, actions[i].extraData) };
        } else {
          currentCopy = {
            ...Object.assign({}, result[i - 1], actions[i].extraData),
          };
        }
        break;
      case 'removeProperties':
        currentCopy = i ? { ...result[i - 1] } : { ...state };

        actions[i].keysToRemove.forEach((x) => delete currentCopy[x]);

        break;

      case 'clear':
        currentCopy = i ? { ...result[i - 1] } : { ...state };

        Object.keys(currentCopy).forEach((x) => delete currentCopy[x]);

        break;

      default:
        continue;
    }
    result.push({ ...currentCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
