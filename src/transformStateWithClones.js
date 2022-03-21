'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const rezult = [];

  for (const key of actions) {
    switch (key.type) {
      case 'clear': {
        for (const objKey in copy) {
          delete copy[objKey];
        }
        break;
      }

      case 'addProperties': {
        Object.assign(copy, key.extraData);
        break;
      }

      case 'removeProperties': {
        key.keysToRemove.forEach(element => {
          delete copy[element];
        });
        break;
      }
    }
    rezult.push({ ...copy });
  }

  return rezult;
}

module.exports = transformStateWithClones;
