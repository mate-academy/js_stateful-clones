'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transform(state, action) {
  if (action.type === 'addProperties') {
    Object.assign(state, action.extraData);
  }

  if (action.type === 'removeProperties') {
    for (const key of action.keysToRemove) {
      delete state[key];
    }
  }

  if (action.type === 'clear') {
    for (const key of Object.keys(state)) {
      delete state[key];
    }
  }
}

function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const result = [];

  for (const action of actions) {
    transform(obj, action);
    result.push(Object.assign({}, obj));
  }

  return result;
}

module.exports = transformStateWithClones;
