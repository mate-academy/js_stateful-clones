'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  actions.forEach((item) => {
    const type = item.type;
    const extra = item.extraData;
    const keys = item.keysToRemove;

    switch (type) {
      case 'addProperties':
        copyState = { ...copyState, ...extra };
        break;

      case 'removeProperties':
        keys.forEach((key) => {
          delete copyState[key];
        });
        break;

      case 'clear':
        copyState = {};
        break;
    }

    result.push({ ...copyState });
  });

  return result;
}

module.exports = transformStateWithClones;
