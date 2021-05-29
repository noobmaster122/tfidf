function dotProduct(vecA, vecB){
    let product = 0;
    for(let i=0;i<vecA.length;i++){
        product += vecA[i] * vecB[i];
    }
    return product;
}
function magnitude(vec){
    let sum = 0;
    for (let i = 0;i<vec.length;i++){
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
}

export function cosineSimilarity(tfIdfObj, docIndex,queryIndex){

    var verticalLength =  Object.keys(tfIdfObj);
    var dotprod = 0;
    var docMag = 0;
    var queryMag = 0;
    Object.keys(tfIdfObj)?.map((key)=>{
        console.log(tfIdfObj[key].tfidf[docIndex] + "*" + tfIdfObj[key].tfidf[queryIndex])
        dotprod += (tfIdfObj[key].tfidf[docIndex] || 0) * (tfIdfObj[key].tfidf[queryIndex] || 0)
        docMag += Math.pow((tfIdfObj[key].tfidf[docIndex] || 0), 2);
        queryMag += Math.pow((tfIdfObj[key].tfidf[queryIndex] || 0), 2);
    })
    console.log("this is the dot prod sum" +  dotprod + "docmag : " + docMag + "query mag : " + queryMag)
    return dotprod / Math.sqrt(docMag * queryMag);
}

