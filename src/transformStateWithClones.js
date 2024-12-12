'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [state];

  for (const action of actions) {
    const nextState = { ...states.at(-1) };

    switch (action.type) {
      case 'addProperties':
        addProperties(nextState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(nextState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(nextState);
        break;
    }

    states.push(nextState);
  }

  return states.slice(1);
}

function addProperties(state, properties) {
  Object.assign(state, properties);
}

function removeProperties(state, keys) {
  for (const key of keys) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key of Object.keys(state)) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
