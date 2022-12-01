'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const step = { ...state };
  const copyStep = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(step, { ...action.extraData });
        copyStep.push({ ...step });
        break;
      case 'removeProperties':
        const optionDelete = action.keysToRemove;

        for (const option of optionDelete) {
          delete step[option];
        }
        copyStep.push({ ...step });
        break;

      case 'clear':

        for (const clear in step) {
          delete step[clear];
        }
        copyStep.push({ ...step });
    }
  }

  return copyStep;
}
module.exports = transformStateWithClones;
