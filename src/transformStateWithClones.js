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

  for (let i = 0; i < actions.length; i++) {
    let nextState;

    switch (actions[i].type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState,
          ...actions[i].extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        actions[i].keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
