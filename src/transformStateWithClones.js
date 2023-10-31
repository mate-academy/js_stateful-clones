'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopys = [];
  let cloneState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...cloneState };

    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default: Error(`Unexpected action type: ${action.type}`);
    }

    stateCopys.push(stateCopy);
    cloneState = stateCopy;
  }

  return stateCopys;
}

module.exports = transformStateWithClones;
