
/*function getUnique(array) {
  var uniqueArray = [];
  var termsPerDoc = []
  // Loop through array values
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
      const docpos = array[i]
      termsPerDoc = [
        ...termsPerDoc,
        {
          [docpos]: 1
        }
      ]
    } else if (uniqueArray.indexOf(array[i]) !== -1) {
      const docPos = uniqueArray.indexOf(array[i])
      termsPerDoc[docPos]++;
    }
  }
  return {
    uniqueArray,
    termsPerDoc
  };
}*/

const normalizedTermDocs = (obj)=>{
  var termperdocValuesArr = Object.values(obj)
  const maxValue = Math.max(...termperdocValuesArr)
  Object.keys(obj)?.map(key =>{
    obj= {
      ...obj,
      [key] : obj[key]/maxValue
    }
  })
  return obj;
}

const getUnique = (redundentArr) => {

  let uniqueArray = [];
  let termsperdoc;

  for (let i = 0; i < redundentArr.length; i++) {

    if (uniqueArray.indexOf(redundentArr[i]) === -1) {

      uniqueArray.push(redundentArr[i])
      termsperdoc = {
        ...termsperdoc,
        [redundentArr[i]]: 1
      }
      console.log("term per doc value after update", termsperdoc[redundentArr[i]])

    } else {
      console.log("am inside here")
      console.log("term per doc value before update", termsperdoc[redundentArr[i]])

      termsperdoc = {
        ...termsperdoc,
        [redundentArr[i]]: termsperdoc[redundentArr[i]] + 1
      }

    }

  }

  termsperdoc = normalizedTermDocs(termsperdoc);

  return {
    uniqueArray,
    termsperdoc
  };

}

const normalizedTfIdf = (normalizedtf, idf)=>{
  let normalizedTfIdfObj = {}
  Object.keys(normalizedtf)?.map((key)=>{
    console.log("----normalized tf : " + normalizedtf[key] * idf)
    normalizedTfIdfObj = {
      ...normalizedTfIdfObj,
      [key]: normalizedtf[key] * idf
    } 
  });
  return normalizedTfIdfObj;
}

export const tfidfCalculator = (obj, corpusSize) => {
  console.log(corpusSize)
  let wordObj = {}
  Object.keys(obj).map(function (key, index) {

    let filteredDfArr = getUnique(obj[key].df).uniqueArray;
    const calcIdf = Math.log2(corpusSize / filteredDfArr.length)

    wordObj = {
      ...wordObj,
      [key]: {
        ...obj[key],
        tfidf: normalizedTfIdf(getUnique(obj[key].df).termsperdoc, calcIdf),
        idf: calcIdf,
        uniqueDfArr: [...getUnique(obj[key].df).uniqueArray],
        termsPerDocArr: getUnique(obj[key].df).termsperdoc
      }
    }
  });
  return wordObj;
}