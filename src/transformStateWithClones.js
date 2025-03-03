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
    const { extraData: data } = action;
    const { keysToRemove: keys } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, data);
        break;

      case 'removeProperties':
        for (const key of keys) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
