'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = addProperties(stateClone, action.extraData);
        break;

      case 'removeProperties':
        stateClone = removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        stateClone = clearProperties(stateClone);
        break;

      default:
        console.log('Unexpected type');
    }

    states.push({ ...stateClone });
  }

  function addProperties(stateClone, extraData) {
    const newState = { ...stateClone };

    for (const key in extraData) {
      newState[key] = extraData[key];
    }

    return newState;
  }

  function removeProperties(stateClone, keysToRemove) {
    const newState = { ...stateClone };

    for (const key of keysToRemove) {
      delete newState[key];
    }

    return newState;
  }

  function clearProperties(stateClone) {
    return {};
  }

  return states;
}

module.exports = transformStateWithClones;
