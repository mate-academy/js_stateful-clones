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
    const { type, extraData, keysToRemove } = action;
    let newState = { ...prevState };

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          newState[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error('Bad action type');
    }

    states.push(newState);
    prevState = { ...newState };
  }

  return states;
}

module.exports = transformStateWithClones;
