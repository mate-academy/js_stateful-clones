'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const resultArray = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'removeProperties':
        keysToRemove.forEach(key => delete stateCopy[key]);
        break;

      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      default:
        stateCopy = {};
        break;
    };

    resultArray.push({ ...stateCopy });
  };

  return resultArray;
}

module.exports = transformStateWithClones;
