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

  for (const element of actions) {
    if (element.type === 'addProperties') {
      Object.assign(transformStep, element.extraData);
    } else if (element.type === 'removeProperties') {
      for (const removeKeys of element.keysToRemove) {
        delete transformStep[removeKeys];
      }
    } else if (element.type === 'clear') {
      transformStep = {};
    }
    transformHistory.push({ ...transformStep });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
