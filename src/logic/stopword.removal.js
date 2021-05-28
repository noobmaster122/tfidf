import stopwordsArr from "../stopwords.json"

//console.log(stopwordsArr)
export const check_stopword_match = (word)=>{
    //console.log(stopwordsArr)
    return stopwordsArr.find((term) => term === word);
}

export const cleanup_corpus = (obj) => {
    let filteredObj = {};
    Object.keys(obj).forEach((term)=>{
        if(! check_stopword_match(term)){
            filteredObj={
                ...filteredObj,
                [term]: obj[term] 
            }
        }
    });
   return filteredObj;
}