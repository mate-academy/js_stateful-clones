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
    const current = actions[i];

    switch (true) {
      case current.type === 'addProperties':
        const first = current.extraData;

        for (const key in first) {
          copy[key] = first[key];
        }
        break;

      case current.type === 'removeProperties':
        const second = current.keysToRemove;

        for (const key of second) {
          delete copy[key];
        }
        break;

      case current.type === 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    clones.push(copy);
  };

  return clones.splice(1);
}

module.exports = transformStateWithClones;
