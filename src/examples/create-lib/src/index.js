
import _ from 'lodash';
import numRef from './data.json';

export function numToWord(num) {
  console.log('numToWord123...');
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
}

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
}

// console.log('123');