'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const el in newState) {
        if (action.keysToRemove.includes(el)) {
          delete newState[el];
        }
      }
    } else if (action.type === 'clear') {
      newState = {};
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
