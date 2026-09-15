'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = [];
  let currentState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties': {
        const addState = { ...currentState };

        Object.assign(addState, key.extraData);
        cloneState.push(addState);
        currentState = addState;
        break;
      }

      case 'removeProperties': {
        const removeState = { ...currentState };

        for (const prop of key.keysToRemove) {
          delete removeState[prop];
        }
        cloneState.push(removeState);
        currentState = removeState;
        break;
      }

      case 'clear': {
        cloneState.push({});
        currentState = {};
        break;
      }
      default:
        break;
    }
  }

  return cloneState;
}

module.exports = transformStateWithClones;
