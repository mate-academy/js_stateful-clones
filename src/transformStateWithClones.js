'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const action of actions) {
    const actionType = action.type;

    switch (actionType) {
      case 'addProperties':
        addProperties(clone, action.extraData);
        result.push({ ...clone });
        break;
      case 'removeProperties':
        removeProperties(clone, action.keysToRemove);
        result.push({ ...clone });
        break;
      case 'clear':
        clear(clone);
        result.push({ ...clone });
        break;
    }
  }

  return result;
}

function addProperties(obj, extraData) {
  for (const key in extraData) {
    obj[key] = extraData[key];
  }
}

function removeProperties(obj, arr) {
  for (const key of arr) {
    if (key in obj) {
      delete obj[key];
    }
  }
}

function clear(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}

module.exports = transformStateWithClones;
