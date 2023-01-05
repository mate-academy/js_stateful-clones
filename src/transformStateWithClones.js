'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneArr = [];
  let clone = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        clone = {};
    }
    cloneArr.push({ ...clone });
  }

  return cloneArr;
}

module.exports = transformStateWithClones;
