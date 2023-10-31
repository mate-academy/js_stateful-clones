'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopys = [];
  let currentState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          if (stateCopy[keyRemove] !== undefined) {
            delete stateCopy[keyRemove];
          }
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`The type of action is not known: ${action.type}`);
    }

    stateCopys.push(stateCopy);
    currentState = stateCopy;
  }

  return stateCopys;
}

module.exports = transformStateWithClones;
