'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const obj = result.length < 1
      ? { ...state }
      : Object.assign({}, result[i - 1]);

    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(obj, actions[i].extraData);

        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete obj[key];
        };

        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }

        break;

      default:
        return [];
    };

    result.push(obj);
  }

  return result;
}

module.exports = transformStateWithClones;
