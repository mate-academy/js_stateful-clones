'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const object = actions[i];
    const { type, ...data } = object;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, data.extraData);

        result.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const key of data.keysToRemove) {
          delete copyState[key];
        }

        result.push({ ...copyState });
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        result.push({ ...copyState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
