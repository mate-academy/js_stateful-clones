'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateToChange = { ...state };

  for (const action of actions) {
    if (result.length !== 0) {
      stateToChange = { ...result[result.length - 1] };
    }

    let resultToPush = null;

    switch (action.type) {
      case 'addProperties':
        resultToPush = addProperties(stateToChange, action.extraData);
        break;
      case 'removeProperties':
        resultToPush = removeProperties(stateToChange, action.keysToRemove);
        break;
      case 'clear':
        resultToPush = clear(stateToChange);
        break;
    }

    result.push(resultToPush);
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
