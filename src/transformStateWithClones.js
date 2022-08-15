'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const returnObjects = [];
  let container;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      toClear();
      container = Object.assign({}, newState);
      returnObjects.push(container);
    }

    if (actions[i].type === 'removeProperties') {
      toRemove(actions[i].keysToRemove);
      container = Object.assign({}, newState);
      returnObjects.push(container);
    }

    if (actions[i].type === 'addProperties') {
      toAdd(actions[i].extraData);
      container = Object.assign({}, newState);
      returnObjects.push(container);
    }
  }

  function toClear() {
    for (const key in newState) {
      delete newState[key];
    }
  }

  function toRemove(x) {
    for (const key in newState) {
      if (x.includes(key)) {
        delete newState[key];
      }
    }
  }

  function toAdd(x) {
    Object.assign(newState, x);
  }

  return returnObjects;
}

module.exports = transformStateWithClones;
