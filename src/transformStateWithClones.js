'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrayOfState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties' :
        Object.assign(newState, extraData);
        break;

      case 'removeProperties' :
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear' :
        newState = {};
        break;
    }

    arrayOfState.push({ ...newState });
  }

  return arrayOfState;
}

module.exports = transformStateWithClones;
