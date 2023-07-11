'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [Object.assign({}, state)];

  for (const action of actions) {
    let nextState = Object.assign({}, states[states.length - 1]);

    switch (action.type) {
      case 'addProperties':
        nextState = Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;
      case 'clear':
        nextState = {};
        break;
    }

    states.push(nextState);
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
