'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let prevState = state;

  for (const action of actions) {
    let newState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          newState = { ...prevState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${String(action.type)}`);
    }

    states.push({ ...newState });
    prevState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
