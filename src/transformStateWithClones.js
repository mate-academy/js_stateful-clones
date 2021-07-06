'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const transformingResult = [];
  const currState = { ...state };

  for (const transformAction of transforms) {
    switch (transformAction.operation) {
      case 'addProperties':
        Object.assign(currState, transformAction.properties);
        break;

      case 'removeProperties':
        for (const property in transformAction.properties) {
          delete currState[transformAction.properties[property]];
        };
        break;

      case 'clear':
        for (const key in currState) {
          delete currState[key];
        }
    }
    transformingResult.push({ ...currState });
  }

  return transformingResult;
}

module.exports = transformStateWithClones;
