'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyChanges = [];
  let lastUpdate = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        lastUpdate = Object.assign({}, lastUpdate, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete lastUpdate[key];
        }

        break;

      case 'clear':
        Object.keys(lastUpdate).forEach((key) => delete lastUpdate[key]);
    }

    historyChanges.push({ ...lastUpdate });

    // if (act.type === 'addProperties') {
    //   lastUpdate = Object.assign({}, lastUpdate, act.extraData);
    //   historyChanges.push({ ...lastUpdate });
    // }

    // if (act.type === 'removeProperties') {
    //   for (const key of act.keysToRemove) {
    //     delete lastUpdate[key];
    //   }

    //   historyChanges.push({ ...lastUpdate });
    // }

    // if (act.type === 'clear') {
    //   Object.keys(lastUpdate).forEach((key) => delete lastUpdate[key]);
    //   historyChanges.push({ ...lastUpdate });
    // }
  }

  return historyChanges;
}

module.exports = transformStateWithClones;
