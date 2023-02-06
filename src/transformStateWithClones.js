'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    const {
      type,
      extraData,
      keysToRemove,
    } = action;

    switch (type) {
      case 'addProperties': {
        Object.assign(copyOfState, extraData);
        arrayOfStates.push({ ...copyOfState });
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete copyOfState[key];
        }
        arrayOfStates.push({ ...copyOfState });
        break;
      }

      case 'clear': {
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        arrayOfStates.push({ ...copyOfState });
      }
    }
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
