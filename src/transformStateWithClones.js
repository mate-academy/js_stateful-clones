'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const hystory = [];
  const stateCopy = { ...state };

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(stateCopy, i.extraData);
        break;

      case 'removeProperties':
        for (const t of i.keysToRemove) {
          delete stateCopy[t];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    // console.log(stateCopy);
    hystory.push({ ...stateCopy });
  }

  return hystory;
}

module.exports = transformStateWithClones;
