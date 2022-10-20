'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [ { ...state } ];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const copy = { ...clones[clones.length - 1] };

        clones.push(Object.assign(copy, action.extraData));
        break;

      case 'removeProperties':
        const lastObj = { ...clones[clones.length - 1] };

        for (const key of action.keysToRemove) {
          delete lastObj[key];
        }
        clones.push(lastObj);
        break;

      case 'clear':
        clones.push({});
        break;
    }
  }

  clones.shift();

  return clones;
}

module.exports = transformStateWithClones;
