'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesAfterActionsArray = [];
  let stateCopy = Object.assign({}, state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error('Invalid action');
    };
    statesAfterActionsArray.push({ ...stateCopy });
  };

  return statesAfterActionsArray;
}

module.exports = transformStateWithClones;
