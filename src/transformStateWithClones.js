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
    if (key.type === 'addProperties') {
      const addState = { ...currentState };

      Object.assign(addState, key.extraData);
      cloneState.push(addState);
      currentState = addState;
    }

    if (key.type === 'removeProperties') {
      const removeState = { ...currentState };

      for (const prop of key.keysToRemove) {
        delete removeState[prop];
      }
      cloneState.push(removeState);
      currentState = removeState;
    }

    if (key.type === 'clear') {
      cloneState.push({});
      currentState = {};
    }
  }

  return cloneState;
}

module.exports = transformStateWithClones;
