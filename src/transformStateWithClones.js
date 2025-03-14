'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = _addProperties(currentState, action);
        break;
      case 'removeProperties':
        currentState = _removeProperties(currentState, action);
        break;
      case 'clear':
        currentState = _clear(currentState);
        break;
    }
    history.push({ ...currentState });
  }

  return history;
}

function _addProperties(state, action) {
  return { ...state, ...action.extraData };
}

function _removeProperties(state, action) {
  const newState = { ...state };

  action.keysToRemove.forEach((key) => delete newState[key]);

  return newState;
}

function _clear(state) {
  return {};
}

module.exports = transformStateWithClones;
