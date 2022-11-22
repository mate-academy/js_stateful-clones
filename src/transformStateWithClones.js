'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let clone = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const k of keysToRemove) {
          delete clone[k];
        }
        break;

      case 'clear':
        clone = {};
        break;
    }

    clones.push({ ...clone });
  });

  return clones;
}

module.exports = transformStateWithClones;
