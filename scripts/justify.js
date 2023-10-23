const { LINE_LENGTH } = require('../env.variables');

const spreadSpaces = (line, pivot, i, index, missingSpaces) => {
    if (i === missingSpaces) {
        return line;
    }
  
    const shouldIncrement = i % 2;
    if (i && shouldIncrement) {
        index++
    }
    if ((pivot + index === line.length - 1) || !(pivot + index)) {
        index = 0;
    }
    if (i === 0) {
        line[pivot] += ' ';
    } else {
        line[pivot + index] += ' ';
    }
  
    return spreadSpaces(line, pivot, i + 1, index * -1, missingSpaces);
};
  
const formatLine = line => {
    const missingSpaces = 80 - [...line].join(' ').length;
    return spreadSpaces(line, Math.floor((line.length - 1) / 2), 0, 0, missingSpaces);
};
  
const justifiedParagraph = text =>
    text.split(' ')
        .reduce((acc, val) => 
            acc.at(-1).join(' ').length + val.length + 1 <= LINE_LENGTH ?
                [...acc.slice(0, acc.length - 1), [...acc.at(-1), val]] :
                [...acc.slice(0, acc.length - 1), [...formatLine(acc.at(-1)), "\n"], [val]]
        , [[]]);

module.exports = {
    justifiedParagraph
};
