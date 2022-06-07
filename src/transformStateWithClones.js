'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  let count = 0;

  for (const action of actions) {
    count === 0
      ? clone.push({ ...state })
      : clone.push({ ...clone[count - 1] });

    switch (action.type) {
      case 'addProperties':
        Object.assign(clone[count], action.extraData);
        break;

      case 'clear':
        for (const key in clone[count]) {
          delete clone[count][key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[count][key];
        }
    }

    count++;
  }

  return clone;
}

module.exports = transformStateWithClones;
