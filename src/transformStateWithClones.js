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
    let newState = Object.assign({}, states[states.length - 1]);

    switch (action.type) {
      case 'addProperties':
        newState = Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        return 'error';
    }

    states.push(newState);
  }

  return states.slice(1);
}

module.exports = transformStateWithClones;
