'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        const keys = action.keysToRemove ?? action.extraData;

        if (Array.isArray(keys)) {
          for (const key of keys) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;
    }
    states.push({ ...currentState });
  }

  return states; // write code here
}

module.exports = transformStateWithClones;
