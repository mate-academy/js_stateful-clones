'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const result = [];

  for (const actionsKeys of actions) {
    switch (actionsKeys.type) {
      case 'addProperties':
        Object.assign(copyState, actionsKeys.extraData);

        const addedProperties = { ...copyState };

        result.push(addedProperties);
        break;
      case 'removeProperties':
        for (const key of actionsKeys.keysToRemove) {
          delete copyState[key];
        }

        const removedProperties = { ...copyState };

        result.push(removedProperties);
        break;
      case 'clear':
        for (const key2 in copyState) {
          delete copyState[key2];
        }

        const clearedProperties = { ...copyState };

        result.push(clearedProperties);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
