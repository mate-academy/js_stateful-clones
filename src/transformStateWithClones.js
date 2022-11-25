'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clones = [state];

  actions.forEach(({ type, extraData, keysToRemove }) => {
    const lastState = clones[clones.length - 1];

    switch (type) {
      case 'addProperties':
        clones = [...clones, {
          ...lastState,
          ...extraData,
        }];
        break;

      case 'removeProperties':
        const newState = { ...lastState };

        keysToRemove.forEach(key => {
          delete newState[key];
        });

        clones = [
          ...clones,
          newState,
        ];
        break;

      case 'clear':
        clones = [
          ...clones,
          {},
        ];
        break;

      default:
        throw new Error('Wrong action type!');
    }
  });

  clones.shift();

  return clones;
}

module.exports = transformStateWithClones;
