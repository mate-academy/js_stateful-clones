'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let res = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(res, extraData);
        results.push({ ...res });
        break;

      case 'removeProperties':
        if (keysToRemove) {
          for (const key of keysToRemove) {
            delete res[key];
          }
        }
        results.push({ ...res });
        break;

      case 'clear':
        res = {};
        results.push({ ...res });
        break;

      default:
        return res;
    }
  }

  return results;
}

module.exports = transformStateWithClones;
