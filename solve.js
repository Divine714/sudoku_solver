const numPool = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const startingString = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
// regex for only digits and period
const filter = /^[1-9.]+$/;
const checkStartingValues = () => {
    return filter.test(startingString);
}
console.log(checkStartingValues());
let startingArray = startingString.split("");
console.log(startingArray);

const checkLength = () => {
    return startingArray.length === 81;
};

const rowArray = (count) => {
    let array = [];
    while (array.length < 9) {
        array.push(startingArray[count]);
        count++;
    }
    return {array, count};
}

const columnArray = (count, columnCount) => {
    let array = [];
    if (columnCount < 9) {
        count = 0;
        while (array.length < 9) {
            array.push(startingArray[columnCount + (count * 9)]);
            count++;
        }
        columnCount++;
    }
    return {array, columnCount};
}
const gridArray = (count, gridCount, separateCount) => {
    let array = [];
    count = 0;
    if (separateCount <= 3) {
        if(separateCount === 3) {
            separateCount = 0;
            gridCount = gridCount + 18;
        }
        while (array.length < 9) {
            array.push(startingArray[gridCount + (count * 9)]);
            array.push(startingArray[gridCount + (count * 9) + 1]);
            array.push(startingArray[gridCount + (count * 9) + 2]);
            count++;
        }
        separateCount++;
        gridCount = gridCount + 3;
        return {array, gridCount, separateCount};
    }


}
let rowObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

let columnObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

let gridObj = [
    [], [], [],
    [], [], [],
    [], [], []
];

const createArrays = () => {
    if(checkLength() && checkStartingValues()) {
        let count = 0;
        rowObj = rowObj.map((key, value) => {
            key = rowArray(count).array;
            count = rowArray(count).count;
            return key
        });
        //console.log(rowObj);

        count = 0;
        let columnCount = 0;
        columnObj = columnObj.map((key, value) => {
            key = columnArray(count, columnCount).array;
            columnCount = columnArray(count, columnCount).columnCount;
            return key;
        })
        //console.log(columnObj);

        count = 0;
        let gridCount = 0;
        let separateCount = 0;
        gridObj = gridObj.map((key, value) => {
            key = gridArray(count, gridCount, separateCount).array;
            gridCount = gridArray(count, gridCount, separateCount).gridCount;
            separateCount = gridArray(count, gridCount, separateCount).separateCount;
            return key
        })
        //console.log(gridObj);
        return {
            rowObj: rowObj,
            columnObj: columnObj,
            gridObj: gridObj,
        }
    } else {
      if (!checkLength()) {
          return { error: "invalid length" }
      }
      if (!checkStartingValues()) {
          return { error: "invalid values" }
      }
    }
}
//console.log(checkLength());
//console.log(createArrays());
let arraySet = createArrays();

const assign = () => {
    let count = 0;
    let count2 = () =>{
        return count/9 < 1 ? count : count % 9
    }
    let count3 = () => {
        if ( count < 27) {
            return Math.floor(count/ 3) - (Math.floor(count / 9) * 3)
        } else if (count >= 27 && count < 54) {
            return Math.floor(count / 3) - (Math.floor(count / 27) * 6) - (Math.floor((count - 27) / 9) * 3)
        }  else if (count >= 54) {
            return Math.floor(count / 3) - (Math.floor(count / 27) * 6) - (Math.floor((count - 54) / 9) * 3)
        }
    }
    let array = [];
    array = startingArray.map((key, value) => {
        let i = Math.floor(count/9);
        let j = count2();
        let k = count3();
        key = [i, j, k];
        count++
        return key;
    })
    return array
}
let index = assign();
console.log(index);

const possibleAnswers = () => {
    let count = 0;
    let array = []
    startingArray.map((key, value) => {

        if (startingArray[count].includes(".")) {
            numPool.map((key, value) => {
                if (arraySet.rowObj[index[count][0]].includes(`${key}`) || arraySet.columnObj[index[count][1]].includes(`${key}`) || arraySet.gridObj[index[count][2]].includes(`${key}`)) {
                    return;
                } else {
                    if(array.length > 0 && array[array.length-1][0] === count){
                        array[array.length-1].push(key)
                    } else
                    array.push([count, key])
                    return array
                }
            })
            count++
        } else {
            count++
        }
    })
    return array
}
let answerPool = possibleAnswers();
let workingArray = startingArray
const check = () => {
    let count = 0;
    while(answerPool.length > 0) {
        if (answerPool[count].length === 2) {
            startingArray.splice(answerPool[count][0], 1, answerPool[count][1].toString());
            arraySet = createArrays();
            answerPool = possibleAnswers();
            //console.log(answerPool);
            count = 0;
        } else {
            count ++
        }
    }

    console.log(startingArray.join(""));
}
check()
