'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let transformedArray = [];
  let transformedObject = {...state};
  for (const elementsOfAction of actions) {
    if (elementsOfAction.type === 'addProperties') {
      let transformedObjectClone = transformedObject;
      Object.assign(transformedObjectClone, elementsOfAction.extraData,)
      transformedArray.push(transformedObjectClone);
      transformedObject = {...transformedObjectClone};
    }
    if (elementsOfAction.type === 'removeProperties') {
      let transformedObjectClone = transformedObject;
      for (let keys of elementsOfAction.keysToRemove) {
        delete transformedObjectClone[keys];
      }
      transformedArray.push(transformedObjectClone)
      transformedObject = {...transformedObjectClone};
    }
    if (elementsOfAction.type === 'clear') {
      let transformedObjectClone = {};
      transformedArray.push(transformedObjectClone);
      transformedObject = {...transformedObjectClone};
    }
  }
  return transformedArray;
}
  module.exports = transformStateWithClones;