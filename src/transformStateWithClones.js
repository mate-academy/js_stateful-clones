'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let clone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const actionObj = actions[i];

    switch (actionObj.type) {
      case 'clear':
        clone = {};

        break;

      case 'addProperties':
        const data = actionObj.extraData;

        clone = { ...clone, ...data };

        break;

      case 'removeProperties':
        const remove = actionObj.keysToRemove;

        for (const cloneKey of remove) {
          delete clone[cloneKey];
        }

        break;
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
