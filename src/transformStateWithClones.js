'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [Object.assign({}, state)];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let newState = Object.assign({}, states[i]);

    if (action.type === 'addProperties') {
      newState = Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        delete newState[action.keysToRemove[j]];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }

    states.push(newState);
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
