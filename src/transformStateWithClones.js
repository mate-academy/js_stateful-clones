'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let previousState = { ...state };

  for (const index of actions) {
    const { type, extraData, keysToRemove } = index;

    switch (type) {
      case 'addProperties':
        Object.assign(previousState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete previousState[key];
        };
        break;

      case 'clear':
        previousState = {};
    }

    history.push({ ...previousState });
  }

  return history;
}

module.exports = transformStateWithClones;
