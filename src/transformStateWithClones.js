'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = Object.assign({}, state);
  const historyOfStates = [];

  for (const action of actions) {
    const { type: actionType } = action;

    switch (actionType) {
      case 'addProperties':
        const { extraData } = action;

        for (const key in extraData) {
          copyOfState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          if (copyOfState[key] !== undefined) {
            delete copyOfState[key];
          }
        }
        break;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
    }

    historyOfStates.push(Object.assign({}, copyOfState));
  }

  return historyOfStates;
}

module.exports = transformStateWithClones;
