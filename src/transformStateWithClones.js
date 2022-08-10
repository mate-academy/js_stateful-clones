'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const cloneOfState = { ...state };

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneOfState, extraData);
        history.push({ ...cloneOfState });
        break;

      case 'removeProperties':
        removeProp(cloneOfState, keysToRemove);
        history.push({ ...cloneOfState });
        break;

      case 'clear':
        clear(cloneOfState);
        history.push({ ...cloneOfState });
        break;

      default:
        throw new Error(`Unknowm action type: ${type}`);
    }
  }

  return history;
}

function removeProp(cloneOfState, keysToRemove) {
  for (const key of keysToRemove) {
    if (cloneOfState.hasOwnProperty(key)) {
      delete cloneOfState[key];
    }
  }
}

function clear(cloneOfState) {
  for (const key in cloneOfState) {
    delete cloneOfState[key];
  }
}

module.exports = transformStateWithClones;
