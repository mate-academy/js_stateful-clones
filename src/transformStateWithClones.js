'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let lastState = state;

  for (const action of actions) {
    lastState = Object.assign({}, lastState);

    switch (action.type) {
      case 'addProperties':
        for (const element in action.extraData) {
          lastState[element] = action.extraData[element];
        }
        break;
      case 'removeProperties':
        for (const element of action.keysToRemove) {
          delete lastState[element];
        }
        break;
      case 'clear':
        for (const element in lastState) {
          delete lastState[element];
        }
        break;
    }
    result.push(lastState);
  }

  return result;
}

module.exports = transformStateWithClones;
