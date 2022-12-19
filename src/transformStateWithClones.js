'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateModifications = [];
  const copy = { ...state };

  for (const object of actions) {
    for (const key in object) {
      switch (object[key]) {
        case 'addProperties':
          Object.assign(copy, object.extraData);

          const copy1 = { ...copy };

          stateModifications.push(copy1);
          break;

        case 'removeProperties':
          for (const value of object.keysToRemove) {
            delete copy[value];
          }

          const copy2 = { ...copy };

          stateModifications.push(copy2);
          break;

        case 'clear':
          for (const i in copy) {
            delete copy[i];
          }

          const copy3 = { ...copy };

          stateModifications.push(copy3);
      }
    }
  }

  return stateModifications;
}

module.exports = transformStateWithClones;
