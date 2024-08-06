'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = []; // will be our result
  let currentState = { ...state }; /* create copy of the
  initial object so later we can push more copies of this object
   to the stateHistory array at each iteration cycle without modifying
   initial state object */

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        currentState = { ...currentState, ...action.extraData };
        /* if action array has an object with 'type: addProperties' property,
        we add properties from extraData object and create another copy of
        current state */
        break;
      }

      case 'removeProperties': {
        currentState = { ...currentState };
        action.keysToRemove.forEach((key) => delete currentState[key]);
        /* additional iteration through keysToRemove object to remove keys
        from currentState */
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }
    }

    stateHistory.push({ ...currentState });
    /* push copy of the currentState at each iteration cycle
    to the result array */
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
