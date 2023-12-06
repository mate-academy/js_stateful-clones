'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneStatesList = [];
  let lastState = { ...state };

  for (const action of actions) {
    let addChanges = {};

    switch (action.type) {
      case 'addProperties':
        addChanges = { ...action.extraData };

        lastState = {
          ...lastState, ...addChanges,
        };

        cloneStatesList.push(lastState);
        break;
      case 'removeProperties':
        lastState = remove(lastState, action.keysToRemove);
        cloneStatesList.push(lastState);
        break;
      case 'clear':
        lastState = {};
        cloneStatesList.push(lastState);
        break;
      default:
        break;
    }
  }

  return cloneStatesList;
}

function remove(state, action) {
  const temp = { ...state };

  for (const prop of action) {
    if (temp.hasOwnProperty(prop)) {
      delete temp[prop];
    }
  }

  return temp;
}

module.exports = transformStateWithClones;
