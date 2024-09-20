'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...obj.extraData };
        arr.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete stateCopy[key];
        }
        arr.push({ ...stateCopy });
        break;

      case 'clear':
        stateCopy = {};
        arr.push(stateCopy);
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
