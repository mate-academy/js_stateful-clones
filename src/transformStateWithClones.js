'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let lastState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(lastState, action.extraData);
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete lastState[value];
        }
        break;

      case 'clear':
        for (const key in lastState) {
          delete lastState[key];
        }
    }

    result.push(lastState);
    lastState = { ...lastState };
  }

  return result;
}

module.exports = transformStateWithClones;
