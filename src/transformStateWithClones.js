'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const versions = [];
  const condition = { ...state };

  for (const step in actions) {
    const { type } = actions[step];

    if (type === 'addProperties') {
      const { extraData } = actions[step];

      Object.assign(condition, extraData);
    }

    if (type === 'removeProperties') {
      const { keysToRemove } = actions[step];

      for (const key in keysToRemove) {
        delete condition[keysToRemove[key]];
      }
    }

    if (type === 'clear') {
      for (const value in condition) {
        delete condition[value];
      }
    }

    const version = { ...condition };

    versions.push(version);
  }

  return versions;
}

module.exports = transformStateWithClones;
