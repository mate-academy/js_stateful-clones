'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [{ ...state }];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        arrayOfStates.push(
          Object.assign(
            { ...arrayOfStates[arrayOfStates.length - 1] },
            action.extraData,
          ),
        );
        break;

      case 'removeProperties':
        arrayOfStates.push({ ...arrayOfStates[arrayOfStates.length - 1] });

        for (const key of action.keysToRemove) {
          delete arrayOfStates[arrayOfStates.length - 1][key];
        }
        break;

      case 'clear':
        arrayOfStates.push({});
        break;
    }
  }

  return arrayOfStates.slice(1);
}

module.exports = transformStateWithClones;
