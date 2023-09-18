'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [Object.assign({}, state)];

  for (const action of actions) {
    const type = action.type;
    let newState = Object.assign({}, newStates[newStates.length - 1]);

    switch (type) {
      case 'addProperties': {
        newState = Object.assign(newState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      }

      case 'clear': {
        newState = {};
        break;
      }
    }
    newStates.push(newState);
  }

  return newStates.slice(1);
}

module.exports = transformStateWithClones;
