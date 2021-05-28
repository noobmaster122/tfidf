import {stemmer} from "./porter.stemmer"

export const stemCorpus = (obj) =>{
    let stemmedObj = {}
    Object.keys(obj).forEach((term)=>{
        let stemmedTerm= stemmer(term)
        if(stemmedTerm.length <= term.length){
            stemmedObj = {
                ...stemmedObj,
                [stemmedTerm]: obj[term]
            }
        }
    })

    return stemmedObj;
}