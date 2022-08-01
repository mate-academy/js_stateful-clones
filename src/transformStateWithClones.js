'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const temp = {};

  Object.assign(temp, state);

  const arr = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        const add = action.extraData;

        for (const index in add) {
          temp[index] = add[index];
        }
        arr.push({ ...temp });
        break;

      case action.type === 'removeProperties':
        const remove = action.keysToRemove;

        for (const index in remove) {
          delete temp[remove[index]];
        }
        arr.push({ ...temp });
        break;

      case action.type === 'clear':
        for (const key in temp) {
          delete temp[key];
        }
        arr.push({ ...temp });
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
