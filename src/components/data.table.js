import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export function DataTable(corpusSize, dataObj, dataType) {

  const docHeaderTitles = (corpuslength)=>{
      let columns = []
      for(let i=0; i<corpuslength-1; i++){
          columns.push(
              <TableCell key={i} className={'table-header'}> {`doc-${i+1}`}</TableCell>
          );
      }
      columns.push(
          <TableCell key={corpuslength}
          className={'table-header'}
          >{`query doc-${corpuslength}`}</TableCell>
      );

      return columns
  }

  const tf_normalizedtf_idf = (corpuslength, obj, arg)=>{
      let dataTable = []
      let rowData=[]
    //for(let i=0; i<corpuslength-1; i++){
        rowData=[]
         Object.keys(obj)?.map((term)=>{
            rowData=[]
            let innerRowData =[]
            rowData.push(
                <TableRow>
                     <TableCell key={term}> {term} </TableCell>
                {
                    (()=>{
                        let dataContent = arg === 'tfidf' ? 'tfidf' : 'termsPerDocArr'
                        for(let j=0; j<corpuslength; j++){
                            let nm = obj[term][dataContent][j];
                            innerRowData.push(
                                <TableCell key={j}>{nm?.toFixed(2) || 0}</TableCell>
                            )
                        }
                        return innerRowData;
                    })()
                }
                </TableRow>
            );

            
            dataTable.push([...rowData])
            })
       
    //}
    return dataTable;

    
  }

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell key={'termsheaders'}
              className={'table-header'}>terms</TableCell>
            {
                corpusSize ? docHeaderTitles(corpusSize) : 'nothing to show'
            }
          </TableRow>
        </TableHead>
        <TableBody>
            {
                   tf_normalizedtf_idf(corpusSize, dataObj, dataType)
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
