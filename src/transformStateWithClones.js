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
    switch (true) {
      case object.type === 'addProperties':

        Object.assign(stateCopy, object.extraData);

        resultArray.push({ ...stateCopy });
        break;
      case object.type === 'removeProperties':
        const keyNamesArray = object.keysToRemove;

        for (const keyName of keyNamesArray) {
          delete stateCopy[keyName];
        }
        resultArray.push(Object.assign({}, stateCopy));
        break;

      case object.type === 'clear':
        const empty = {};

        stateCopy = empty;
        resultArray.push({ ...stateCopy });
        break;
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
