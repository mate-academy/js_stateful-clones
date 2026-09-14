'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        result.push({ ...Object.assign(copy, action.extraData) });
        break;

      case 'removeProperties':
        action.keysToRemove.map((x) => delete copy[x]);
        result.push({ ...copy });
        break;

      case 'clear':
        Object.keys(copy).map((x) => delete copy[x]);
        result.push({ ...copy });
        break;
    }
  }

  return result;
}
module.exports = transformStateWithClones;
