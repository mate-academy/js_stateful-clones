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
        break;
      case action.type === 'removeProperties':
        remove(action.keysToRemove);
        break;
      case action.type === 'clear':
        clear();
        break;
    }
  }

  function add(data) {
    tempObject = { ...tempObject, ...data };
    updatedState.push({ ...tempObject });
  }

  function remove(data) {
    for (const del of data) {
      delete tempObject[del];
    }
    updatedState.push({ ...tempObject });
  }

  function clear() {
    tempObject = {};
    updatedState.push({ ...tempObject });
  }

  return updatedState;
}

module.exports = transformStateWithClones;
