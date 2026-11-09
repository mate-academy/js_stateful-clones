'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const finalResult = [];

  for (const action of actions) {
    stateCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'clear':
        stateCopy = {};
        break;

      case 'removeProperties':
        for (const key of Object.keys(stateCopy)) {
          if (action.keysToRemove.includes(key)) {
            delete stateCopy[key];
          }
        }
        break;

      default:
        break;
    }
    finalResult.push(stateCopy);
  }

  return finalResult;
}

module.exports = transformStateWithClones;
