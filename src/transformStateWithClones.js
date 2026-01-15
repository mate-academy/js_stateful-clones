'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currState = { ...state };

  for (const action of actions) {
    let nextState = { ...currState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(nextState, action.extraData);
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
    }

    states.push(nextState);
    currState = nextState;
  }

  return states;
}

module.exports = transformStateWithClones;
