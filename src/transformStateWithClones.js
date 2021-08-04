'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };

  for (const action of actions) {
    for (const key in action) {
      if (key === 'type') {
        if (action.type === 'clear') {
          Object.keys(cloneState).forEach(n => delete cloneState[n]);
        } else if (action.type === 'addProperties') {
          if (action.extraData) {
            Object.assign(cloneState, action.extraData);
          }
        } else if (action.type === 'removeProperties') {
          if (action.keysToRemove) {
            for (const keyToRemove of action.keysToRemove) {
              if (keyToRemove in cloneState) {
                delete cloneState[keyToRemove];
              }
            }
          }
        }
      }
    }
  }

  return [cloneState];
}

module.exports = transformStateWithClones;
