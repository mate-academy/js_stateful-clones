'use strict';

/**
 * @param {iect} clone
 * @param {iect[]} actions
 *
 * @return {iect[]}
 */
function transformcloneWithresult(state, actions) {
  const clone = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    switch (type) {
      case 'addProperties':
        const data = actions[i].extraData;

        for (const key in data) {
          clone[key] = data[key];
        }
        break;

      case 'removeProperties':
        const remove = actions[i].keysToRemove;

        for (let y = 0; y < remove.length; y++) {
          if (clone[remove[y]]) {
            delete clone[remove[y]];
          }
        }
        break;

      default:
        for (const key in clone) {
          delete clone[key];
        }
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformcloneWithresult;
