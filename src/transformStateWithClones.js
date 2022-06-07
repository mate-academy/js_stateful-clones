'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [{ ...state }];
  let count = 0;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (count > 0) {
      clone.push({ ...clone[count - 1] });
    }

    switch (type) {
      case 'addProperties':
        Object.assign(clone[count], extraData);
        break;

      case 'clear':
        for (const key in clone[count]) {
          delete clone[count][key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[count][key];
        }
    }

    count++;
  }

  return clone;
}

module.exports = transformStateWithClones;
