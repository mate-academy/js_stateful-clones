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

  for (const i of actions.keys()) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(res, extraData);
        break;

      case 'removeProperties':
        if (keysToRemove) {
          for (const key of keysToRemove) {
            delete res[key];
          }
        }
        break;

      case 'clear':
        res = {};
        break;

      default:
        return res;
    }

    results.push({ ...res });
  }

  return results;
}

module.exports = transformStateWithClones;
