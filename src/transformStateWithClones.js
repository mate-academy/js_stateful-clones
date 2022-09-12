'use strict';

/**
 * @param {Object} stateClone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let nowAction;
  const stateClone = {};

  Object.assign(stateClone, state);

  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    nowAction = Object.values(actions[i]);

    const objectAction = {};

    switch (nowAction[0]) {
      case 'addProperties':
        for (const key2 in nowAction[1]) {
          stateClone[key2] = nowAction[1][key2];
        }
        resultArray.push(Object.assign(objectAction, stateClone));
        break;

      case 'removeProperties':
        for (let k = 0; k < nowAction[1].length; k++) {
          delete stateClone[nowAction[1][k]];
        }
        resultArray.push(Object.assign(objectAction, stateClone));
        break;

      case 'clear':
        for (const key in stateClone) {
          if (stateClone.hasOwnProperty(key)) {
            delete stateClone[key];
          }
        }
        resultArray.push(Object.assign(objectAction, stateClone));
        break;
    }
  }

  // for (let i = 0; i < actions.length; i++) {
  //   nowAction = Object.values(actions[i]);

  //   if (nowAction[0] === 'addProperties') {
  //     for (const key in nowAction[1]) {
  //       stateClone[key] = nowAction[1][key]
  //     }

  //     resultArray.push(stateClone);
  //   }

  //   if (nowAction[0] === 'removeProperties') {
  //     for (let k = 0; k < nowAction[1].length; k++) {
  //       delete stateClone[nowAction[1][k]];
  //     }
  //     resultArray.push(stateClone);
  //   }

  //   if (nowAction[0] === 'clear') {
  //     for (const key in stateClone) {
  //       if (stateClone.hasOwnProperty(key)) {
  //         delete stateClone[key];
  //       }
  //     }
  //     resultArray.push(stateClone);
  //   }
  // }

  return resultArray;
}

module.exports = transformStateWithClones;
