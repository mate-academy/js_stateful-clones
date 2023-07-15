'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let prevState = { ...state };

  for (const action of actions) {
    let newState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
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
        return Error('Bad action type');
    }

    states.push(newState);
    prevState = { ...newState };
  }

  return states;
}

module.exports = transformStateWithClones;
