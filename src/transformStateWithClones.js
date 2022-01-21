'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [{ ...state }];

  actions.forEach(action => {
    const { type, extraData, keysToRemove } = action;
    let newState = { ...stateVersions[stateVersions.length - 1] };

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    stateVersions.push(newState);
  });

  stateVersions.shift();

  return stateVersions;
}

module.exports = transformStateWithClones;
