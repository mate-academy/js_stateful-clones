'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const newState = {};

  Object.assign(newState, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(newState, action.extraData);
        array.push(Object.assign({}, newState));
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        array.push(Object.assign({}, newState));
        break;
      }

      case 'clear': {
        for (const property in newState) {
          delete newState[property];
        }
        array.push(Object.assign({}, newState));
        break;
      }

      default: {
        throw new Error(`Unknown action type ${action.type}`);
      }
    }
  }

  return array;
}

module.exports = transformStateWithClones;
