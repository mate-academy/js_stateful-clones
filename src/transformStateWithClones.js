'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const k = [];
  let stateClone = {
    ...state,
  };

  for (const action in actions) {
    const { type } = actions[action];

    switch (type) {
      case 'addProperties':
        const { extraData } = actions[action];

        stateClone = {
          ...stateClone,
          ...extraData,
        };
        k.push({ ...stateClone });
        break;

      case 'removeProperties':
        const { keysToRemove } = actions[action];

        for (const key of keysToRemove) {
          for (const kInStat in stateClone) {
            if (key === kInStat) {
              delete stateClone[key];
            }
          }
        }
        k.push({ ...stateClone });
        break;

      case 'clear':
        stateClone = {};
        k.push({ ...stateClone });
        break;

      default:
        break;
    }
  }

  return k;
}

module.exports = transformStateWithClones;
