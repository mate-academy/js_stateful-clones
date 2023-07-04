'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const REMOVE_ALL = 'clear';
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';

  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let copyOfState = { ...currentState };
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD:
        Object.assign(copyOfState, extraData);
        break;

      case REMOVE:
        if (keysToRemove) {
          for (const key of keysToRemove) {
            delete copyOfState[key];
          }
        }
        break;

      case REMOVE_ALL:
        copyOfState = {};
        break;
    }

    result.push(copyOfState);
    currentState = copyOfState;
  }

  return result;
}

module.exports = transformStateWithClones;
