'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const cloneState = Object.assign({}, state);

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    switch (type) {
      case 'addProperties': {
        Object.assign(
          cloneState, extraData
        );
        break;
      }

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete cloneState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in cloneState) {
          delete cloneState[key];
        };
        break;
      }
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
