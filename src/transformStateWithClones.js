'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const result = [];
  const copy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copy, actions[i].extraData);

        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete copy[key];
        };

        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }

        break;

      default:
        return [];
    };

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
