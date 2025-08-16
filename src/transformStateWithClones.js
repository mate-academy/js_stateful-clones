'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
// eslint-disable-next-line no-unused-vars
const transformStateWithClones = (state, actions) => {
  const ACTION_ADD_PROPERTIES = 'addProperties';

  const ACTION_REMOVE_PROPERTIES = 'removeProperties';

  const ACTION_CLEAR = 'clear';

  const MESSAGE_ACTION_INVALID = 'Action invalid';

  const stateHistory = [];

  let previousState = state;

  for (const action of actions) {
    // preserve state and use copy of it for each iteration
    let stateCopy = Object.assign({}, previousState);

    if (typeof action.type !== 'undefined') {
      switch (action.type) {
        case ACTION_ADD_PROPERTIES:
          if (action.extraData) {
            Object.assign(stateCopy, action.extraData);
          }
          break;
        case ACTION_REMOVE_PROPERTIES:
          if (action.keysToRemove) {
            for (const key of action.keysToRemove) {
              // no errors on missed keys
              delete stateCopy[key];
            }
          }
          break;
        case ACTION_CLEAR:
          for (const property in stateCopy) {
            if (Object.hasOwn(stateCopy, property)) {
              delete stateCopy[property];
            }
          }
          break;
        default:
          throw new Error(MESSAGE_ACTION_INVALID);
      }
      stateHistory.push({ ...stateCopy });
      stateCopy = Object.assign({}, stateCopy);
      previousState = stateCopy;
    }
  }

  return stateHistory;
};

module.exports = transformStateWithClones;
