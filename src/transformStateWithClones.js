'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];

  clones[0] = state;

  for (let i = 0; i < actions.length; i++) {
    const copy = Object.assign({}, clones[i]);
    const { type, ...Keys } = actions[i];

    switch (type) {
      case 'addProperties':
        for (const key in Keys.extraData) {
          copy[key] = Keys.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of Keys.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default:
        return 'ERROR';
    }

    clones.push(copy);
  };

  return clones.splice(1);
}

module.exports = transformStateWithClones;
