'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let errorMsg = '';
  const versions = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {
    if (i > 0) {
      versions.push({
        ...versions[i - 1],
      });
    }

    switch (actions[i].type) {
      case 'addProperties':
        for (const value in actions[i].extraData) {
          versions[i][value] = actions[i].extraData[value];
        }
        break;

      case 'removeProperties':
        for (const remove of actions[i].keysToRemove) {
          delete versions[i][remove];
        }
        break;

      case 'clear':
        versions[i] = {};
        break;

      default:
        errorMsg = 'Unexpected action type in switch/case statement';
    }

    if (errorMsg) {
      return;
    }
  }

  if (errorMsg) {
    return errorMsg;
  }

  return versions;
}

module.exports = transformStateWithClones;
