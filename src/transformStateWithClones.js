'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear' :
        for (const property in newState) {
          delete newState[property];
        }
        break;
    }

    arrayOfState.push({ ...newState });
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
