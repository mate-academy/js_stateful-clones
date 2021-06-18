'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = JSON.parse(JSON.stringify(state));
  const transformClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        Object.keys(copyState).forEach((item) => delete copyState[item]);
        break;
    }
    transformClones.push({ ...copyState });
  }

  return transformClones;
}

module.exports = transformStateWithClones;
