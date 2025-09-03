'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const keysProperties = { ...action.extraData };

        for (const key in keysProperties) {
          currentState[key] = keysProperties[key];
        }
        break;
      case 'removeProperties':
        const remove = action.keysToRemove;

        for (let j = 0; j < remove.length; j++) {
          if (currentState[remove[j]]) {
            delete currentState[remove[j]];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
