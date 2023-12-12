'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const updateState = [];
  let cloneObj = clone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      cloneObj = Object.assign(cloneObj, action.extraData);
      updateState.push(clone(cloneObj));
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneObj[key];
      }

      updateState.push(clone(cloneObj));
    }

    if (action.type === 'clear') {
      cloneObj = {};
      updateState.push({});
    }
  }

  return updateState;
}

function clone(obj) {
  const cloneObj = {};

  for (const key in obj) {
    cloneObj[key] = obj[key];
  }

  return cloneObj;
}

module.exports = transformStateWithClones;
