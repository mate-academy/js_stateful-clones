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
    switch (action.type) {
      case 'addProperties':
        add(action.extraData);
        break;
      case 'removeProperties':
        remove(action.keysToRemove);
        break;
      case 'clear':
        clear();
        break;
    }
    updatedState.push({ ...tempObject });
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
