'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let prevState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const newState = { ...prevState, ...action.extraData };

        result.push(newState);
        prevState = newState;
        break;
      }

      case 'removeProperties': {
        const newState = { ...prevState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        result.push(newState);
        prevState = newState;
        break;
      }

      case 'clear': {
        const newState = {};

        result.push(newState);
        prevState = newState;
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
