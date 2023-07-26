'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesList = [];
  const currentState = { ...state };

  for (const action of actions) {
    const actionType = action.type;

    switch (actionType) {
      case 'addProperties':
        const actionData = action.extraData;

        if (typeof actionData === 'object') {
          Object.assign(currentState, actionData);
        }

        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        });

        break;
      case 'clear':
        Object.keys(currentState).forEach(key => {
          delete currentState[key];
        });

        break;
      default:
        throw new Error(`Error: ${action.type} is an invalid action type!`);
    }

    statesList.push({ ...currentState });
  }

  return statesList;
}

module.exports = transformStateWithClones;
