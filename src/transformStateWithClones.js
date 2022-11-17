'use strict';

/**
 * @param {Object} localState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(stste, actions) {
  const listOfClones = [];
  let stateCopy = {
    ...stste,
  };

  for (const obj of actions) {
    const action = obj['type'];
    const localState = {
      ...stateCopy,
    };

    switch (action) {
      case 'addProperties':
        addProperties(localState, obj.extraData);
        break;

      case 'removeProperties':
        removeProperties(localState, obj.keysToRemove);
        break;

      case 'clear':
        clear(localState);
        break;

      default:

        break;
    }

    listOfClones.push(localState);
    stateCopy = localState;
  }

  return listOfClones;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, toRemove) {
  for (const i of toRemove) {
    delete state[i];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
