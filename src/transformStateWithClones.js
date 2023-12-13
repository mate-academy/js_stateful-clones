'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      result.push(addProperties(stateCopy, action));
    }

    if (type === 'removeProperties') {
      result.push(removeProperties(stateCopy, action));
    }

    if (type === 'clear') {
      result.push(clearProperties(stateCopy));
    }
  }

  return result;
}

function addProperties(state, action) {
  if ('extraData' in action) {
    const keyData = 'extraData';
    const value = action[keyData];

    for (const key in value) {
      state[key] = value[key];
    }
  }

  return { ...state };
}

function removeProperties(state, action) {
  if ('keysToRemove' in action) {
    const keyRemove = 'keysToRemove';
    const value = action[keyRemove];

    for (const key of value) {
      delete state[key];
    }
  }

  return { ...state };
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }

  return { ...state };
}

module.exports = transformStateWithClones;
