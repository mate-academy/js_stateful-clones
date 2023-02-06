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
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete copyOfState[key];
        }
        break;
      }

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
      default:
        return 'type was not provided';
    }

    arrayOfStates.push({ ...copyOfState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
