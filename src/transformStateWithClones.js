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

  actions.forEach(elem => {
    switch (elem.type) {
      case 'addProperties':
        for (const key in elem.extraData) {
          copy[key] = elem.extraData[key];
        }
        break;
      case 'removeProperties':
        elem.keysToRemove.forEach(item => {
          delete copy[item];
        });
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    result.push({ ...copy });
  });

  return result;
}

module.exports = transformStateWithClones;
