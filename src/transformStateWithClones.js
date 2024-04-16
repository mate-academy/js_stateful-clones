'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const finalArray = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      stateCopy = Object.assign(stateCopy, action.extraData);

      finalArray.push({ ...stateCopy });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete stateCopy[key];
      });

      finalArray.push({ ...stateCopy });
    }

    if (action.type === 'clear') {
      for (const property in stateCopy) {
        delete stateCopy[property];
      }

      finalArray.push({});
    }
  });

  return finalArray;
}

module.exports = transformStateWithClones;
