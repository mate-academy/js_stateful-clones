'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateCopy = add(stateCopy, extraData);
        break;
      case 'removeProperties':
        stateCopy = remove(stateCopy, keysToRemove);
        break;
      case 'clear':
        stateCopy = clear();
        break;
    }

    stateHistory.push(Object.assign({}, stateCopy));
  }

  return stateHistory;
}

function add(state, data) {
  return Object.assign({}, state, data);
}

function remove(state, data) {
  for (const key of data) {
    if (state.hasOwnProperty(key)) {
      delete state[key];
    }
  }

  if (isEmpty(state)) {
    clear(state);
  }

  return state;
}

function clear() {
  return {};
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

module.exports = transformStateWithClones;
