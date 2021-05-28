export const tfidfCalculator = (obj, corpusSize) => {
    console.log(corpusSize)
    let wordObj ={}
    Object.keys(obj).map(function(key, index) {
        //console.log(obj[key])
        const calculatetfidf = obj[key].tf * Math.log2(corpusSize/obj[key].df.length)
      //  console.log(obj[key].df)
          wordObj = {
            ...wordObj,
            [key]: {
              ...obj[key],
              tfidf : calculatetfidf
            }
        }
      });
      return wordObj;
}