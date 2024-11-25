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

  actions.forEach((elem) => {
    const { type, extraData, keysToRemove } = elem;

    switch (type) {
      case 'addProperties':
        copyState = Object.assign(copyState, extraData);

        result.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyState[key];
        }

        result.push({ ...copyState });
        break;

      case 'clear':
        copyState = {};

        result.push({ ...copyState });

        break;
    }
  });

  return result;
}

module.exports = transformStateWithClones;
