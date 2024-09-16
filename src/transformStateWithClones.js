'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let initialState = Object.assign({}, state);
  const allState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(initialState, action.extraData);
        break;

      case 'removeProperties':
        for (const prop in action.keysToRemove) {
          delete initialState[action.keysToRemove[prop]];
        }
        break;

      case 'clear':
        initialState = {};
    }
    allState.push({ ...initialState });
  }

  return allState;
}

module.exports = transformStateWithClones;
