'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const target = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (true) {
      case type === 'addProperties':
        for (const value in extraData) {
          target[value] = extraData[value];
        }
        break;
      case type === 'removeProperties':
        for (const value of keysToRemove) {
          delete target[value];
        }
        break;
      case type === 'clear':
        for (const key in target) {
          delete target[key];
        }
        break;
    }

    const previous = { ...target };

    history.push(previous);
  }

  return history;
}

module.exports = transformStateWithClones;
