'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const options = Object.values(actions);
  const result = [];

  for (const option of options) {
    const { keysToRemove, type } = option;

    if (type === 'clear') {
      result.push({});
    }

    if (type === 'addProperties') {
      let lastElementOfArray;

      if (result[result.length - 1]) {
        lastElementOfArray = Object.assign({}, result[result.length - 1],
          option.extraData);
      } else {
        lastElementOfArray = Object.assign({}, state, option.extraData);
      }
      result.push(lastElementOfArray);
    }

    if (type === 'removeProperties') {
      let lastElementOfArray;

      if (result[result.length - 1]) {
        lastElementOfArray = Object.assign({}, result[result.length - 1]);
      } else {
        lastElementOfArray = Object.assign({}, state);
      }

      for (const prop of keysToRemove) {
        if (lastElementOfArray[prop]) {
          delete lastElementOfArray[prop];
        }
      }
      result.push(lastElementOfArray);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
