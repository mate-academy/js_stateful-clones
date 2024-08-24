'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const eachAction = [];
  let initialState = { ...state };

  for (const action of actions) {
    let newState = { ...initialState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    eachAction.push(newState);
    initialState = newState;
  }

  return eachAction;
}

module.exports = transformStateWithClones;
