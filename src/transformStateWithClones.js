'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  function prepareNewObject(previousState) {
    previousStates.push(previousState);
    stateCopy = Object.assign({}, previousState);
  }

  let stateCopy = Object.assign({}, state);
  const previousStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const act in action.extraData) {
          stateCopy[act] = action.extraData[act];
        }
        break;
      case 'removeProperties':
        for (const act of action.keysToRemove) {
          delete stateCopy[act];
        }
        break;
      case 'clear':
        break;
      default:
        throw new Error('Unknown action: ' + action.type);
    }
    prepareNewObject(action.type === 'clear' ? {} : stateCopy);
  }

  return previousStates;
}

module.exports = transformStateWithClones;
