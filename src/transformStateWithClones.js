'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = Object.assign({}, state);
  const copyHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      const copyTmp = Object.assign({}, copy, { ...obj.extraData });

      copyHistory.push(copyTmp);
      copy = Object.assign({}, copyTmp, { ...obj.extraData });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete copy[key];
      }
      copyHistory.push(Object.assign({}, copy));
    }

    if (obj.type === 'clear') {
      copy = Object.assign({}, {});
      copyHistory.push(copy);
    }
  }

  return copyHistory;
}

module.exports = transformStateWithClones;
