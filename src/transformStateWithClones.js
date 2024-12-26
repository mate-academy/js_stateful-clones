'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

function transformStateWithClones(initialState, operations) {
  const result = [];
  let currentState = { ...initialState };

  for (const operation of operations) {
    switch (operation.type) {
      case 'addProperties':
        currentState = { ...currentState, ...operation.extraData };
        break;
      case 'removeProperties':
        currentState = Object.keys(currentState)
          .filter((key) => !operation.keysToRemove.includes(key))
          .reduce((newState, key) => {
            newState[key] = currentState[key];

            return newState;
          }, {});
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
