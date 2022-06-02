'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const cloneState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        for (const data in extraData) {
          cloneState[data] = extraData[data];
        }

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneState[key];
        }

        break;

      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
    }

    history.push({ ...cloneState });
  }

  return history;
}

module.exports = transformStateWithClones;
