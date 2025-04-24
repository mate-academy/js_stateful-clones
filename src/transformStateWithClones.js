'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const newestState = { ...newState };

      for (let i = 0; i < action.keysToRemove.length; i++) {
        const key = action.keysToRemove[i];

        delete newestState[key];
      }
      newState = newestState;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
