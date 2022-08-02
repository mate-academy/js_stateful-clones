'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      if (resultArray.length === 0) {
        resultArray.push(Object.assign({}, state, actions[i].extraData));
      } else {
        resultArray.push(Object.assign({
        }, resultArray[i - 1], actions[i].extraData));
      }
    }

    if (actions[i].type === 'clear') {
      resultArray.push({});
    }

    if (actions[i].type === 'removeProperties') {
      if (resultArray.length === 0) {
        const clone = Object.assign({}, state);

        for (const keyToRemove of actions[i].keysToRemove) {
          delete clone[keyToRemove];
        }
        resultArray.push(clone);
      } else {
        const clone = Object.assign({}, resultArray[i - 1]);

        for (const keyToRemove of actions[i].keysToRemove) {
          delete clone[keyToRemove];
        }
        resultArray.push(clone);
      }
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
