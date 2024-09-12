'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let referenceState = { ...state };

  for (const action of actions) {
    const copy = { ...referenceState };
    const { type } = action;

    switch (type) {
      case 'addProperties': {
        const { extraData } = action;

        for (const [key, value] of Object.entries(extraData)) {
          copy[key] = value;
        }

        result.push(copy);
        referenceState = { ...copy };
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete copy[key];
        }

        result.push(copy);
        referenceState = { ...copy };
        break;
      }

      case 'clear': {
        result.push({});
        referenceState = {};
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
