'use strict';

const ADD = 'addProperties';
const DELETE = 'removeProperties';
const CLEAR = 'clear';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateVersions = [];

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD:
        Object.assign(stateClone, extraData);
        break;

      case DELETE:
        keysToRemove.forEach(key => {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        });
        break;

      case CLEAR:
      default:
        for (const key in stateClone) {
          delete stateClone[key];
        };
        break;
    };

    stateVersions.push({ ...stateClone });
  });

  return stateVersions;
}

module.exports = transformStateWithClones;
