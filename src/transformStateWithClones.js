'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData } = action;

    switch (type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        removeKey(action, stateCopy);
        break;

      default: throw new Error('Unexpected action.type value');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

const removeKey = function(actionObject, object) {
  const { keysToRemove } = actionObject;

  for (const keyToRemove of keysToRemove) {
    delete object[keyToRemove];
  }
};

module.exports = transformStateWithClones;
