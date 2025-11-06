'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const interimState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProps(interimState, action.extraData);
        break;
      case 'removeProperties':
        removeProps(interimState, action.keysToRemove);
        break;
      case 'clear':
        clearProps(interimState);
        break;
      default:
        break;
    }
    result.push(Object.assign({}, interimState));
  }

  return result;
}

function addProps(targetObj, sourceObj) {
  for (const key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }
}

function removeProps(targetObj, sourceObj) {
  for (const key of sourceObj) {
    delete targetObj[key];
  }
}

function clearProps(targetObj) {
  for (const key in targetObj) {
    delete targetObj[key];
  }
}

module.exports = transformStateWithClones;
