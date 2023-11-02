'use strict';

/**
 * @param {Object} stateCopy
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateCopy = { ...state };

  for (const object of actions) {
    if (object.type === 'addProperties') {
      const extraData = object.extraData;

      Object.assign(stateCopy, extraData);

      resultArray.push({ ...stateCopy });
    }

    if (object.type === 'removeProperties') {
      const keyNamesArray = object.keysToRemove;

      for (const keyName of keyNamesArray) {
        delete stateCopy[keyName];
      }
      resultArray.push(Object.assign({}, stateCopy));
    }

    if (object.type === 'clear') {
      const empty = {};

      stateCopy = empty;
      resultArray.push({ ...stateCopy });
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
