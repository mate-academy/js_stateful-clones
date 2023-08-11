'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let copyState = { ...state };
  const _addProperties = 'addProperties';
  const _removeProperties = 'removeProperties';
  const _clear = 'clear';

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case _addProperties:
        Object.assign(copyState, extraData);
        break;

      case _removeProperties:
        for (const removeKey of keysToRemove) {
          delete copyState[removeKey];
        }
        break;

      case _clear:
        copyState = {};
        break;

      default:
        throw new Error('Type error!');
    }
    result.push({ ...copyState });
  }

  return result;
}
module.exports = transformStateWithClones;
