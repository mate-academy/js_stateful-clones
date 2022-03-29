'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    let stateToChage = null;

    if (result.length === 0) {
      stateToChage = { ...state };
    } else {
      stateToChage = { ...result[result.length - 1] };
    }

    switch (action.type) {
      case 'addProperties':
        result.push(
          addProperties(stateToChage, action.extraData));
        break;
      case 'removeProperties':
        result.push(
          removeProperties(stateToChage, action.keysToRemove));
        break;
      case 'clear':
        result.push(clear(stateToChage));
        break;
    }
  }

  return result;
}

function addProperties(state, data) {
  const copy = { ...state };

  for (const key in data) {
    copy[key] = data[key];
  }

  return copy;
}

function removeProperties(state, keys) {
  const copy = { ...state };

  for (const key of keys) {
    delete copy[key];
  }

  return copy;
}

function clear(state) {
  const copy = { ...state };

  for (const key in state) {
    delete copy[key];
  }

  return copy;
}

module.exports = transformStateWithClones;
