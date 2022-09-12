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

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        toClear();
        break;
      }

      case 'removeProperties': {
        toRemove(action.keysToRemove);
        break;
      }

      case 'addProperties': {
        toAdd(action.extraData);
        break;
      }

      default: {
        window.alert(`I don't know why I am here`);
      }
    }

    returnObjects.push(Object.assign({}, newState));
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
