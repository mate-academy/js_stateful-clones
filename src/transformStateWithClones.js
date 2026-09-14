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
        if (!i) {
          currentCopy = { ...state };
        } else {
          currentCopy = { ...result[i - 1] };
        }
        actions[i].keysToRemove.map((x) => delete currentCopy[x]);

        break;

      case 'clear':
        if (!i) {
          currentCopy = { ...state };
        } else {
          currentCopy = { ...result[i - 1] };
        }
        Object.keys(currentCopy).map((x) => delete currentCopy[x]);

        break;
    }
    result.push({ ...currentCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
