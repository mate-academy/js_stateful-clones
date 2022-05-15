'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const dataArr = [];
  const fullData = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        for (const keys in fullData) {
          delete fullData[keys];
        };
        break;
      case 'addProperties':
        Object.assign(fullData, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete fullData[key];
        }
        break;
    }
    dataArr.push({ ...fullData });
  }

  return dataArr;
}

module.exports = transformStateWithClones;
