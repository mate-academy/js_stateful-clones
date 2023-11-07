'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];
  const AD_PROP = 'addProperties';
  const REM_PROP = 'removeProperties';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case AD_PROP:
        for (const data in extraData) {
          copyState[data] = extraData[data];
        }
        break;

      case REM_PROP:
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const property in copyState) {
          delete copyState[property];
        }
        break;
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
