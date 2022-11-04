'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const versions = [];

  for (const a of actions) {
    switch (a.type) {
      case 'addProperties':
        const steps = a.extraData;

        for (const key in steps) {
          if (!copy[key]) {
            copy[key] = steps[key];
          }

          if (copy[key]) {
            copy[key] = steps[key];
          }
        };
        versions.push(copy);
        break;

      case 'removeProperties':
        const takeAway = a.keysToRemove;

        for (const name of takeAway) {
          if (copy[name]) {
            delete copy[name];
          }
        };
        versions.push(copy);
        break;

      case 'clear':
        for (const n in copy) {
          delete copy[n];
        };
        versions.push(copy);
        break;
    }

    copy = { ...copy };
  };

  return versions;
}

module.exports = transformStateWithClones;
