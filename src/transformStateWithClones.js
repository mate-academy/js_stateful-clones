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
    const { type, extraData, keysToRemove } = action;

    lastState = Object.assign({}, lastState);

    switch (type) {
      case 'addProperties':
        Object.assign(lastState, extraData);
        break;
      case 'removeProperties':
        for (const element of keysToRemove) {
          delete lastState[element];
        }
        break;
      case 'clear':
        lastState = {};
    }
    result.push(lastState);
  }

  return result;
}

module.exports = transformStateWithClones;
