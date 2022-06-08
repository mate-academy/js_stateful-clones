'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const newState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);

        break;

      case 'removeProperties':
        for (const prop of keysToRemove) {
          delete copy[prop];
        }

        break;

      case 'clear':
        for (const elm in copy) {
          delete copy[elm];
        }
    }

    newState.push({ ...copy });
  }

  return newState;
}

module.exports = transformStateWithClones;
