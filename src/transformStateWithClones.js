'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const inputState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(inputState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete inputState[key];
        };
        break;

      case 'clear':
        for (const key in inputState) {
          delete inputState[key];
        };
        break;
    }

    result.push({ ...inputState });
  }

  return result;
}

module.exports = transformStateWithClones;
