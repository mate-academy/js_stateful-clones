'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STATE_HISTORY = []; // empty array that holds history of changes
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';
  let currentState = { ...state }; // deep copy of the initial state object

  actions.forEach(action => {
    switch (action.type) {
      case ADD_PROPERTIES:
        currentState = {
          ...currentState, ...action.extraData, // copy the current state
          // and adds extra action
        };
        break;
      case REMOVE_PROPERTIES:
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      case CLEAR:
        currentState = {};
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Proper action was not defined');
    }
    STATE_HISTORY.push({ ...currentState });
  });

  return STATE_HISTORY;
}

module.exports = transformStateWithClones;
