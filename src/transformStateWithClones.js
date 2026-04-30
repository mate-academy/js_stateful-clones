'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = structuredClone(state);

  for (const el of actions) {
    const type = el.type;

    switch (type) {
      case 'addProperties':
        Object.assign(obj, el.extraData);
        break;

      case 'removeProperties':
        for (const key of el.keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        obj = {};
        break;

      default:
        break;
    }

    result.push(structuredClone(obj));
  }

  return result;
}

module.exports = transformStateWithClones;
