'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR = 'clear';

  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case ADD_PROPERTIES:
        newState = Object.assign(currentState, action.extraData);
        break;
      case REMOVE_PROPERTIES:
        const copy = { ...currentState };

        for (const k of action.keysToRemove) {
          delete copy[k];
        }

        newState = { ...copy };
        break;
      case CLEAR:
        newState = {};
        break;
    }

    currentState = { ...newState };
    history.push(newState);
  }

  return history;
}

module.exports = transformStateWithClones;
