'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];
  let transformStep = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformStep, action.extraData);
        break;
      case 'removeProperties':
        for (const removeKeys of action.keysToRemove) {
          delete transformStep[removeKeys];
        };
        break;
      case 'clear':
        transformStep = {};
    }
    transformHistory.push({ ...transformStep });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
