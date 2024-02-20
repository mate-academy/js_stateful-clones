'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const newArr = [];

  if (!actions.length) {
    return null;
  }

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const prop of action.keysToRemove) {
        delete newState[prop];
      }
    }

    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;
