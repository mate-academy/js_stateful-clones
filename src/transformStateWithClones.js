'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const array = [];
  let obj = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        stateCopy[key] = value;
      }
      obj = { ...stateCopy };
      array.push(obj);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
      obj = { ...stateCopy };
      array.push(obj);
    }

    if (action.type === 'clear') {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }
      obj = { ...stateCopy };
      array.push(obj);
    }
  }

  return array;
}

module.exports = transformStateWithClones;
