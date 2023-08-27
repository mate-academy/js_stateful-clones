'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transform(state, action) {
  const cloneState = {};

  for (const key in state) {
    cloneState[key] = state[key];
  }

  switch (action.type) {
    case 'addProperties':
      // add all extraData props to the state
      Object.assign(cloneState, action.extraData);
      break;

    case 'removeProperties': {
      // remove all keysToRemove from the state
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }

      break;
    }

    case 'clear': {
      // remove all state keys from it
      for (const key of Object.keys(cloneState)) {
        delete cloneState[key];
      }

      break;
    }

    default: {
      return {};
    }
  }

  return cloneState;
}

function transformStateWithClones(state, actions) {
  // write code here
  const actionArray = [];

  for (const action of actions) {
    // apply every action to the state
    if (actionArray.length > 0) {
      actionArray.push(transform(actionArray[actionArray.length - 1], action));
    } else {
      actionArray.push(transform(state, action));
    }
  }

  return actionArray;
}

module.exports = transformStateWithClones;
