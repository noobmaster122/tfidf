
const normalizeWord = (word) => {
    return word.toLowerCase().replace(/[^\w]/g, "");
}

export const tokenizeDocs = (corpus) => {
var tokens = {}
corpus.forEach((doc, index) => {
    const words = doc.split(/[\s_():.!?,;]+/);
  //  console.log("these are words", words)
    words.forEach((word)=>{
        let tokenizdWord = normalizeWord(word);
        if(/\d+/.test(tokenizdWord) === false){
            if(tokens[tokenizdWord]){
                // check if doc already exists
                const termDocRealtion = tokens[tokenizdWord].df.find((docInedx)=> docInedx === index)
                if(tokens[tokenizdWord].tf >= 1){
                    tokens={
                        ...tokens,
                        [tokenizdWord] : {
                            ...tokens[tokenizdWord],
                            tf: tokens[tokenizdWord].tf+1,
                            df: [
                                ...tokens[tokenizdWord].df,
                                index
                            ]
                        }
                    }
                }/*else if(tokens[tokenizdWord].tf >= 1 && termDocRealtion){
                    tokens={
                        ...tokens,
                        [tokenizdWord] : {
                            ...tokens[tokenizdWord],
                            tf: tokens[tokenizdWord].tf+1
                        }
                    }
                }*/
            }else{
                tokens={
                    ...tokens,
                    [tokenizdWord] : {
                        tf: 1,
                        df: [index]
                    }
                }
            }
        }
    })
});
console.log(tokens)
return tokens;
}