#!/usr/bin/env node
const minimist = require("minimist");

const WordPOS = require("wordpos");
const wordpos = new WordPOS()

const args = minimist(process.argv.slice(2));
const alphabets = args._[0];
const minLength = args._[1];
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)),
      []
    );
};
const generate = arr => arr.split('').reduce((subsets, value) => subsets.concat(subsets.map(set => [value,...set].join(''))),[[]]);
const isNoun = async (str) => await wordpos.isNoun(str);
const isVerb = async (str) => await wordpos.isVerb(str);
const isAdjective = async (str) => await wordpos.isAdjective(str);
const isAdverb = async (str) => await wordpos.isAdverb(str);
const isMeaningful = (str) => isNoun(str) || isVerb(str) || isAdjective(str) || isAdverb(str);
generate(alphabets).map((str) => str.length > minLength ? stringPermutations(str).map(async word => await isMeaningful(word) ? console.log(word): null) : null) ;
