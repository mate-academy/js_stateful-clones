'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        transformState.push(clear(currentState));
        break;

      case 'addProperties':
        transformState.push(addProperties(currentState, action.extraData));
        break;

      case 'removeProperties':
        transformState.push(
          removeProperties(currentState, action.keysToRemove),
        );
        break;

      default:
        break;
    }
  }

  return transformState;
}

function addProperties(cloneState, extraData) {
  Object.assign(cloneState, extraData);

  return { ...cloneState };
}

function removeProperties(cloneState, keysToRemove) {
  for (const key of keysToRemove) {
    delete cloneState[key];
  }

  return { ...cloneState };
}

function clear(cloneState) {
  for (const key in cloneState) {
    delete cloneState[key];
  }

  return {};
}

module.exports = transformStateWithClones;
