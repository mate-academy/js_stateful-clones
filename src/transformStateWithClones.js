'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const objectState = [];

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        Object.assign(copyState, element.extraData);
        break;

      case 'removeProperties':
        for (const key of element.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const char in copyState) {
          delete copyState[char];
        }
    }
    objectState.push({ ...copyState });
  }

  return objectState;
}

module.exports = transformStateWithClones;
