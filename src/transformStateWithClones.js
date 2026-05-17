'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let previousStateClone = { ...state };

  for (const action of actions) {
    let nextStateClone = { ...previousStateClone };

    switch (action.type) {
      case 'clear':
        nextStateClone = {};
        break;

      case 'addProperties':
        nextStateClone = { ...nextStateClone, ...action.extraData };
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          nextStateClone = Object.keys(nextStateClone)
            .filter((key) => !action.keysToRemove.includes(key))
            .reduce((accumulator, key) => {
              accumulator[key] = nextStateClone[key];

              return accumulator;
            }, {});
        }
        break;

      default:
        break;
    }

    result.push(nextStateClone);
    previousStateClone = nextStateClone;
  }

  return result;
}

module.exports = transformStateWithClones;
