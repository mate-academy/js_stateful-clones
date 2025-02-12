'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClones = [];

  for (const action of actions) {
    const prevState = stateWithClones[stateWithClones.length - 1]
      ? { ...stateWithClones[stateWithClones.length - 1] }
      : { ...state };
    let newState = null;

    switch (action.type) {
      case 'clear':
        newState = clear();
        break;
      case 'addProperties':
        newState = addProperties(action.extraData, prevState);
        break;
      case 'removeProperties':
        newState = removeProperties(action.keysToRemove, prevState);
        break;
    }

    stateWithClones.push(newState);
  }

  return stateWithClones;
}

function addProperties(extraData, state) {
  return {
    ...state,
    ...extraData,
  };
}

function removeProperties(keysToRemove, state) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function clear() {
  return {};
}

module.exports = transformStateWithClones;
