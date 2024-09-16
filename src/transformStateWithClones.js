'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayFromTransform = [];
  const copyOfState = { ...state };

  for (const transform of transforms) {
    switch (transform['operation']) {
      case 'addProperties':
        Object.assign(copyOfState, transform['properties']);
        arrayFromTransform.push({ ...copyOfState });
        break;
      case 'removeProperties':
        for (const value of transform['properties']) {
          delete copyOfState[value];
        }
        arrayFromTransform.push({ ...copyOfState });
        break;
      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        arrayFromTransform.push({});
    }
  }

  return arrayFromTransform;
}

module.exports = transformStateWithClones;
