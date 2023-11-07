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
    switch (action.type) {
      case 'addProperties':
        const newStateAdd = { ...currentState, ...action.extraData };
        result.push({ ...newStateAdd });
        currentState = { ...newStateAdd };
        break;

      case 'removeProperties':
        const newStateRemove = { ...currentState };
        for (const key of action.keysToRemove) {
          delete newStateRemove[key];
        }
        result.push({ ...newStateRemove });
        currentState = { ...newStateRemove };
        break;

      case 'clear':
        const newStateClear = {};
        result.push({ ...newStateClear });
        currentState = { ...newStateClear };
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
