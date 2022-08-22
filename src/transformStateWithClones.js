'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  const stateCopied = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(stateCopied, object.extraData);
        break;

      case 'removeProperties':
        object.keysToRemove.forEach(el => {
          delete stateCopied[el];
        });
        break;

      case 'clear':
        for (const key in stateCopied) {
          delete stateCopied[key];
        }
        break;
    }

    clone.push({ ...stateCopied });
  }

  return clone;
}

module.exports = transformStateWithClones;
