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
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      currentState = { ...currentState, ...extraData };
    } else
    if (type === 'removeProperties') {
      currentState = Object.keys(currentState).reduce((newState, key) => {
        if (!keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }

        return newState;
      }, {});
    } else
    if (type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
