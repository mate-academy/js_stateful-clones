'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    let nextState;

    switch (type) {
      case 'addProperties':
        const { extraData } = action;

        nextState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        nextState = { ...currentState };
        keysToRemove.forEach((key) => delete nextState[key]);
        break;

      case 'clear':
        nextState = {};
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
