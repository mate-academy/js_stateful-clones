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
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        Object.assign(res, action.extraData);
        results.push({ ...res });
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
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
