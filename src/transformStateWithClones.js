'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let newState = {
    ...state,
  };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      newState = {
        ...newState,
        ...i.extraData,
      };
      states.push(newState);
    } else if (i.type === 'removeProperties') {
      newState = {
        ...newState,
      };

      for (const k of i.keysToRemove) {
        delete newState[k];
      }
      states.push(newState);
    } else {
      newState = {
        ...newState,
      };

      for (const j in newState) {
        delete newState[j];
      }
      states.push(newState);
    }
  }

  return states;
}

module.exports = transformStateWithClones;
