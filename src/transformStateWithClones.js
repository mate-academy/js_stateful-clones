'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function addProperties(actions, state) {
  Object.assign(actions, state);
}

function removeProperties(from, which) {
  for (const key in from) {
    if (which.includes(key)) {
      delete from[key];
    }
  }
}

function clear(from) {
  for (const key in from) {
    delete from[key];
  }
}

function copyOf(state) {
  return Object.assign({}, state);
}

function transformStateWithClones(state, actions) {
  const results = [];
  const newState = copyOf(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      addProperties(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      removeProperties(newState, action.keysToRemove);
    } else if (action.type === 'clear') {
      clear(newState);
    }
    results.push(copyOf(newState));
  }

  return results;
}

module.exports = transformStateWithClones;
