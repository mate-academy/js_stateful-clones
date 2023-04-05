'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const obj of actions) {
    const resultItem = !result.length
      ? { ...state }
      : { ...result[result.length - 1] };

    switch (true) {
      case obj.type === 'addProperties':
        addProperties(resultItem, obj);
        break;
      case obj.type === 'removeProperties':
        removeProperties(resultItem, obj);
        break;
      default:
        clear(resultItem);
    };
    result.push(resultItem);
  };

  return result;
}

function addProperties(state, obj) {
  Object.assign(state, obj.extraData);

  return state;
}

function removeProperties(state, obj) {
  for (const key of obj.keysToRemove) {
    if (state[key]) {
      delete state[key];
    }
  }

  return state;
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
