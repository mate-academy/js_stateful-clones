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

    switch (type) {
      case 'addProperties':
        stateVersions.push({
          ...stateVersions[stateVersions.length - 1],
          ...extraData,
        });
        break;

      case 'removeProperties':
        stateVersions.push({ ...stateVersions[stateVersions.length - 1] });

        Object.keys(stateVersions[stateVersions.length - 1]).forEach(key => {
          if (keysToRemove.includes(key)) {
            delete stateVersions[stateVersions.length - 1][key];
          }
        });
        break;

      case 'clear':
        stateVersions.push({});
        break;

      default:
        break;
    }
  });

  stateVersions.shift();

  return stateVersions;
}

module.exports = transformStateWithClones;
