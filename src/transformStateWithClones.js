'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objState = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      objState = { ...objState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const newObj = { ...objState };

      for (const key of action.keysToRemove) {
        delete newObj[key];
      }
      objState = newObj;
    }

    if (action.type === 'clear') {
      objState = {};
    }

    arr.push({ ...objState });
  }

  return arr;
}

module.exports = transformStateWithClones;
