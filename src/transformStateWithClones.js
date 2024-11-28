'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = [];
  let stateCopy = { ...state };

  for (const actionIndex in actions) {
    const action = actions[actionIndex];
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = {};
        break;
    }

    resultObject.push({ ...stateCopy });
  }

  return resultObject;
}

module.exports = transformStateWithClones;
