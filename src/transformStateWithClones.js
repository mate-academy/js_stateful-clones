'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = { ...state };
  const past = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        const newStateCopy = { ...stateCopy };

        for (const remove of action.keysToRemove) {
          delete newStateCopy[remove];
        }
        stateCopy = newStateCopy;
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Wrong action type`);
    }

    past.push({ ...stateCopy });
  }

  return past;
}

module.exports = transformStateWithClones;
