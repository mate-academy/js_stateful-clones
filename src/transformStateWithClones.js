'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    const typeOfAction = action.type;

    let newState = Object.assign({}, currentState);

    switch (typeOfAction) {
      case 'addProperties': {
        Object.assign(newState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const prop of action.keysToRemove) {
          delete newState[prop];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }
    }

    res.push(newState);
    currentState = newState;
  }

  return res;
}

module.exports = transformStateWithClones;
