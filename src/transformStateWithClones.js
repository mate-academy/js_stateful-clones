'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const updatedState = [];
  let tempObject = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        add(action.extraData);
        updatedState.push({ ...tempObject });
        break;
      case action.type === 'removeProperties':
        remove(action.keysToRemove);
        updatedState.push({ ...tempObject });
        break;
      case action.type === 'clear':
        clear();
        updatedState.push({ ...tempObject });
        break;
    }
  }

  function add(data) {
    tempObject = { ...tempObject, ...data };
  }

  function remove(data) {
    for (const del of data) {
      delete tempObject[del];
    }
  }

  function clear() {
    tempObject = {};
  }

  return updatedState;
}

module.exports = transformStateWithClones;
