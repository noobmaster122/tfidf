import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';
// tokenizer
import {tokenizeDocs} from './logic/tokenize.corpus';
import {check_stopword_match, cleanup_corpus} from "./logic/stopword.removal"
import {stemCorpus} from "./logic/stem.corpus"
import {tfidfCalculator} from './logic/calculate.tfidf';
import {cosineSimilarity} from './logic/cosinusSimilarity';
import {DataTable} from './components/data.table';
//mui components
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
// mui icons
import BackupIcon from '@material-ui/icons/Backup';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';

function App() {

  const [corpus, setcorpus] = useState([]);
  const [treatedCorpus, setTreatedCorpus] = useState(null);
  // most similar doc
  const [msd, setmsd] = useState(null);
  const handleUpload = (e)=>{
    e.preventDefault()
  //  console.log("am triggered")
    try{
      const inputedFiles = [...e.target.files]
      const promises = [];
      inputedFiles.forEach((file)=>{
        promises.push(file.text());
      })
      Promise.all(promises)
      .then(res => {
        let x = JSON.stringify(res)
        setcorpus([...res]);
      })
      .catch(error=>console.log(error))
    }catch(err){
      console.log(err)
    }

  }

  useEffect(() => {
   // console.log("this is the treated corpus", treatedCorpus)
  }, [treatedCorpus]);

  const showList = (obj)=>{
    return Object.keys(obj).map((key, index)=>{
    //  console.log(key + ":" + obj[key].tf)
      return(
       <li key={index}> 
        {`${key} | tf : ${obj[key].tf} | df : ${obj[key].df.length}`}
       </li>
       );
    });
  }

  useEffect(() => {
   // console.log(corpus)
    /*if(corpus.length > 0){
      let tokenizedCorpus = tokenizeDocs(corpus)
       let postStopWordCleanUp = cleanup_corpus(tokenizedCorpus)
      const wordObj = tfidfCalculator(postStopWordCleanUp, corpus.length)
      console.log(wordObj)
       setTreatedCorpus(wordObj)
       for(let i=0; i<corpus.length-1; i++){
        console.log("this is what ive been looking for ", cosineSimilarity(wordObj, i, corpus.length-1))
       }
    }*/

  }, [corpus]);

  const initLookup = (corpusArr)=>{
  //  console.log("before you init lookpu give me the size of the corpus", corpusArr.length)
    if(corpusArr.length > 0){
      var mostsimilardoc;
      let corpusdocs=[]
      let tokenizedCorpus = tokenizeDocs(corpusArr)
       let postStopWordCleanUp = cleanup_corpus(tokenizedCorpus)
      const wordObj = tfidfCalculator(postStopWordCleanUp, corpusArr.length)
     // console.log(wordObj)
      var stemmedsortedobj = stemCorpus(wordObj);
      console.log("the length of the obj before stemming is ", Object.keys(wordObj).length )
      console.log("the length of the obj after stemming is ", Object.keys(stemmedsortedobj).length )

      setTreatedCorpus(sortedTreatedCorpus(stemmedsortedobj))
       for(let i=0; i<corpusArr.length-1; i++){
      //  console.log(cosineSimilarity(wordObj, i, corpusArr.length-1))
        corpusdocs.push(cosineSimilarity(wordObj, i, corpusArr.length-1))
       // console.log(corpusdocs)
       }

       var x = Math.max(...corpusdocs)
       mostsimilardoc = corpusdocs.indexOf(x)
//console.log("am the math max value" + Math.max(...corpusdocs)+ "am its index " + mostsimilardoc)
       setmsd(mostsimilardoc)
    }
  }

  useEffect(() => {
   // console.log("am updating bitch! ", msd)

  }, [msd]);

  const sortedTreatedCorpus = (obj)=>{
    let sortedobj={}

    Object.keys(obj).sort().forEach((v)=>{
      sortedobj={
        ...sortedobj,
        [v]: obj[v]
    }
    });

    return sortedobj;

  }

  return (
    <Grid xs={12} md={12} lg={12} container item
    >
    <Grid container item xs={12} md={12} lg={12}
    style={{
      display: "table"
    }}
    justify="center"
    alignItems="center"
    >
      <Grid  xs={10} md={2} lg={2} container item
      className={'upload-file-btn-container innerGrid'}
        >
          <input type="file" id={'file-upload-word-btn'}
          hidden
          multiple
          onChange={(e)=>handleUpload(e)}
          />
          <label className="upload-file-label" htmlFor="file-upload-word-btn" id="upload-custom-label" 
          >
            <BackupIcon 
            style={{
              color: "olive"
            }}/>
          </label>
      </Grid>
      <Grid xs={10} md={8} lg={8} container item
      className={'innerGrid'}
      >
        <TextField
          id="queryStr"
          variant="outlined"
          style={{
          width: "100%",
          border: "3px solid olive",
          borderRadius: "20px"
          }}
        />
        <Typography variant="body2"
        style={{
          marginLeft: "15px",
          color: "rgba(0,0,0,0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <InfoIcon style={{
          color: "olive",
          marginRight: "3px"
        }}/>
        upload your custom corpus and start querying!

        </Typography>
      </Grid>
      <Grid xs={10} md={2} lg={2} container item
      className={'innerGrid'}
      style={{
        display: "flex",
        justifyContent: "center"
      }}> 
        <Button
        variant="outlined"
        style={{
          border: "3px solid olive",
          width: "100%"
        }}
        onClick={(e)=>{
          e.preventDefault()
          var querystring = document.getElementById("queryStr").value;
          if(corpus.length > 0){
            var corpusQueryArr = [...corpus];
            corpusQueryArr =[
              ...corpusQueryArr,
              querystring
            ]
            setcorpus(corpusQueryArr)
            console.log(corpusQueryArr)
            initLookup(corpusQueryArr)
          }
        }}>
          <SearchIcon 
          style={{
            color: 'olive'
          }}/>
        </Button>
      </Grid>
      
    </Grid>
    <Grid container item xs={12} md={12} lg={12}
    style={{
      padding: "50px"

    }}
    justify="center"
    alignItems="center">
      <Grid xs={12} md={12} lg={12}>
        <Typography variant="h3"
        style={{
          textAlign: "center",
          marginBottom: "20px"
        }}>
          {msd !== null ?
          <>
           {`most similar doc to the query is doc-${msd+1}`}
          </>  
          : 
          <>
            nothing to show yet!
          </>
        }
        </Typography>

      </Grid>
      <Grid xs={12} md={4} lg={5}
      style={{
        marginRight: "20px"
      }}>
      {
        msd !== null ?
        <>
          {DataTable(corpus.length, treatedCorpus, "tfidf")}
        </>
        :
        <>
          nothing to show yet !
        </>
      }
      </Grid>
      <Grid xs={12} md={4} lg={5}>
      {
        msd !== null ?
        <>
          {DataTable(corpus.length, treatedCorpus, "termsPerDocArr")}
        </>
        :
        <>
          nothing to show yet !
        </>
      }
      </Grid>

    </Grid>
    </Grid>
  );
}

export default App;
