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
  let stateClon = {
    ...state,
  };
  const actionsClone = {};

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case ('removeProperties'):
        for (const kInStat in stateClon) {
          for (let n = 0; n < actions[i].keysToRemove.length; n++) {
            if (kInStat === actions[i].keysToRemove[n]) {
              delete stateClon[kInStat];
            }
          }
        }

        actionsClone[i] = {
          ...stateClon,
        };
        k[i] = actionsClone[i];
        break;
      case ('clear'):
        for (const del in stateClon) {
          delete stateClon[del];
        }

        if (actionsClone[i] === undefined) {
          actionsClone[i] = {};
        }
        k[i] = actionsClone[i];
        break;
      default:
        actionsClone[i] = {
          ...stateClon,
          ...actions[i].extraData,
        };

        stateClon = {
          ...stateClon,
          ...actions[i].extraData,
        };
        k[i] = actionsClone[i];
        break;
    }
  }

  // const k = Object.assign(actionsClone[0], actionsClone[1], actionsClone[2]);

  return k;
}

module.exports = transformStateWithClones;
