'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let res = { ...results[i] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(res, action.extraData);
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete res[key];
          }
        }
        break;
      case 'clear':
        res = {};
        break;
      default:
        continue;
    }

    results.push({ ...res });
  }

  return results;
}

module.exports = transformStateWithClones;
