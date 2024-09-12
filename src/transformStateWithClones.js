'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let bufferObj = { ...state };

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        Object.assign(bufferObj, elem.extraData);

        const propAdd = { ...bufferObj };

        result.push(propAdd);

        break;

      case 'removeProperties':
        for (const key of elem.keysToRemove) {
          delete bufferObj[key];
        }

        const propRemove = { ...bufferObj };

        result.push(propRemove);
        break;

      case 'clear':
        bufferObj = {};

        const propClaer = { ...bufferObj };

        result.push(propClaer);

        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
