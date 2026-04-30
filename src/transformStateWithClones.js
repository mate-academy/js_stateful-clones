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
        result.push(structuredClone(obj));
        break;

      case 'removeProperties':
        for (const e of el.keysToRemove) {
          delete obj[e];
        }
        result.push(structuredClone(obj));
        break;

      case 'clear':
        obj = {};
        result.push(structuredClone(obj));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
