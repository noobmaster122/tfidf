import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
// tokenizer
import {tokenizeDocs} from './logic/tokenize.corpus';
import {check_stopword_match, cleanup_corpus} from "./logic/stopword.removal"
import {stemCorpus} from "./logic/stem.corpus"
import {tfidfCalculator} from './logic/calculate.tfidf';

function App() {

  const [corpus, setcorpus] = useState([]);
  const [treatedCorpus, setTreatedCorpus] = useState(null);

  const handleUpload = (e)=>{
    e.preventDefault()
    try{
      const inputedFiles = [...e.target.files]
      const promises = [];
      inputedFiles.forEach((file)=>{
        promises.push(file.text());
      })
      Promise.all(promises)
      .then(res => {
        let x = JSON.stringify(res)
        setcorpus([...res, "looking for a developer"]);
      })
      .catch(error=>console.log(error))
    }catch(err){
      console.log(err)
    }

  }

  const showList = (obj)=>{
    return Object.keys(obj).map((key, index)=>{
      console.log(key + ":" + obj[key].tf)
      return(
       <li key={index}> 
        {`${key} | tf : ${obj[key].tf} | df : ${obj[key].df.length}`}
       </li>
       );
    });
  }

  useEffect(() => {
    console.log(corpus)
    if(corpus.length > 0){
      let tokenizedCorpus = tokenizeDocs(corpus)
      // console.log(tokenizedCorpus)
      /* console.log(Object.keys(tokenizedCorpus))
       console.log(tokenizedCorpus)*/
       let postStopWordCleanUp = cleanup_corpus(tokenizedCorpus)
      // console.log(postStopWordCleanUp)
       let stemmedCorpus = stemCorpus(postStopWordCleanUp)
       //console.log(Object.keys(stemmedCorpus))
      // console.log(stemmedCorpus)
       const wordObj = tfidfCalculator(stemmedCorpus, corpus.length)
       //setTreatedCorpus(wordObj)
       console.log(wordObj)
    }

  }, [corpus]);

  return (
    <>
    <form>
        <input id="file-input" type="file" multiple
        onChange={(e)=>handleUpload(e)}/>
        <button type="submit">
          upload files
        </button>
        <ul>
          {
            treatedCorpus ? showList(treatedCorpus) : "nothing to show"
          }
        </ul>
    </form>
    </>
  );
}

export default App;
