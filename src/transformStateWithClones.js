'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const logs = [];
  let currentState = state;

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if ('extraData' in action) {
          Object.assign(stateCopy, action.extraData);
        }
        break;

      case 'removeProperties':
        if ('keysToRemove' in action) {
          for (const remove of action.keysToRemove) {
            delete stateCopy[remove];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    currentState = stateCopy || currentState;
    logs.push(stateCopy);
  }

  return logs;
}

module.exports = transformStateWithClones;
