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
    const action = actions[i];
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      for (let j = 0; j < keysToRemove.length; j++) {
        const key = keysToRemove[j];

        if (!(newState[key] === undefined)) {
          delete newState[key];
        }
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }

    result.push(newState);
    currentState = { ...newState };
  }

  return result;
}

module.exports = transformStateWithClones;
