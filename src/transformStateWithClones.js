'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalState = [];
  const newState = { ...state };

  actions.forEach((item) => {
    const { type, ...rest } = item;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, rest.extraData);
        break;

      case 'removeProperties':
        for (const key of rest.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    const currentState = { ...newState };

    finalState.push(currentState);
  });

  return finalState;
}

module.exports = transformStateWithClones;
