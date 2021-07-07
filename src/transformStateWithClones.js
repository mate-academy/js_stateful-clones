'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  let copyState = { ...state };
  const result = [];

  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i]['operation'] === 'addProperties') {
      copyState = Object.assign(copyState, transforms[i]['properties']);
    }

    if (transforms[i]['operation'] === 'removeProperties') {
      for (let j = 0; j < transforms[i]['properties'].length; j++) {
        delete copyState[transforms[i]['properties'][j]];
        copyState = { ...copyState };
      }
    }

    if (transforms[i]['operation'] === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }

    result.push(copyState);
    copyState = { ...copyState };
  }

  return result;
}

module.exports = transformStateWithClones;
