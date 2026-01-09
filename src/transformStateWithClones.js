'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const history = [];
  let lastState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState = {};

    switch (type) {
      case 'addProperties':
        nextState = {
          ...lastState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key in lastState) {
          if (!keysToRemove.includes(key)) {
            nextState[key] = lastState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = lastState;
    }

    history.push(nextState);
    lastState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
