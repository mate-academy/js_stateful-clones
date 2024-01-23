'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let previosState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...previosState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...previosState };

        action.keysToRemove.forEach((key) => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;

      default:
        newState = { ...previosState };
        break;
    }
    result.push(newState);
    previosState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
