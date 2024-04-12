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
    switch (action.type) {
      case 'addProperties':
        stateCopy = add(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        stateCopy = remove(stateCopy, action.keysToRemove);
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
    if (Object.hasOwn(state, key)) {
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
