'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];

  let object = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      object = { ...object, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete object[key];
      }
    } else if (action.type === 'clear') {
      object = {};
    }

    newArray.push({ ...object });
  }

  return newArray;
}

module.exports = transformStateWithClones;
