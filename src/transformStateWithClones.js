'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massive = [];
  let newState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      newState = { ...newState, ...obj.extraData };
    } else if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete newState[key];
      }
    } else if (obj.type === 'clear') {
      newState = {};
    }
    massive.push({ ...newState });
  }

  return massive;
}

module.exports = transformStateWithClones;
