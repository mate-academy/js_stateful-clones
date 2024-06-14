'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = {};

  Object.assign(copy, state);

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        Object.assign(copy, i.extraData);
        break;

      case 'removeProperties':
        for (const j of i.keysToRemove) {
          delete copy[j];
        }
        break;

      case 'clear':
        for (const k in copy) {
          delete copy[k];
        }
        break;
    }

    const object = {
      ...copy,
    };

    result.push(object);
  }

  return result;
}

module.exports = transformStateWithClones;
