'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let allProperties = {};

  for (const action of actions) {
    if (action.type === 'addProperties') {
      if (newState.length === 0) {
        newState.push(Object.assign({}, state, action['extraData']));
      } else {
        newState.push(
          Object.assign({}, newState[newState.length - 1], action['extraData'])
        );
      }
    }

    if (action.type === 'removeProperties') {
      if (newState.length === 0) {
        Object.assign(allProperties, state);
      } else {
        Object.assign(allProperties, newState[newState.length - 1]);
      }

      for (const property of action['keysToRemove']) {
        delete allProperties[property];
      }

      newState.push(allProperties);
      allProperties = {};
    }

    if (action.type === 'clear') {
      newState.push({});
    }
  }

  return newState;
}

module.exports = transformStateWithClones;
