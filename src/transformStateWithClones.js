'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const newCopy = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const char of action.keysToRemove) {
          delete copyState[char];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
    }
    newCopy.push({ ...copyState });
  }

  return newCopy;
}

module.exports = transformStateWithClones;
