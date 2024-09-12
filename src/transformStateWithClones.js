'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  let lastState = { ...state };

  actions.forEach(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        lastState = Object.assign(lastState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete lastState[key];
        });
        break;

      case 'clear':
        lastState = {};
        break;

      default:
        throw new Error('Wrong action type!');
    }

    clones.push({ ...lastState });
  });

  return clones;
}

module.exports = transformStateWithClones;
