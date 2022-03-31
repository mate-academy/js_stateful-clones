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
    switch (i.type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...i.extraData,
        };
        break;

      case 'removeProperties':
        newState = {
          ...newState,
        };

        for (const k of i.keysToRemove) {
          delete newState[k];
        }
        break;

      default:
        newState = {
          ...newState,
        };

        for (const j in newState) {
          delete newState[j];
        }
    }
    states.push(newState);
  }

  return states;
}

module.exports = transformStateWithClones;
