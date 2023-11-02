'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let firstCopy = { ...state };

  for (const action of actions) {
    const copy = { ...firstCopy };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copy[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    } else if (action.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    result.push(copy);
    firstCopy = { ...copy };
  }

  return result;
}

module.exports = transformStateWithClones;
