'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(clone, action.extraData);
        logState(history, clone);
        break;

      case 'removeProperties':
        removeProperties(clone, action.keysToRemove);
        logState(history, clone);
        break;

      case 'clear':
        removeProperties(clone, Object.keys(clone));
        logState(history, clone);
        break;
    }
  }

  return history;
}

function addProperties(state, properties) {
  Object.assign(state, properties);
}

function removeProperties(state, keys) {
  for (const key of keys) {
    delete state[key];
  }
}

function logState(history, state) {
  history.push({ ...state });
}

module.exports = transformStateWithClones;
