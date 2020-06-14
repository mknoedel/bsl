import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import tabs from '../utils/tabs';
import getRating from '../utils/getRating';
import { makeStyles, Grid } from '@material-ui/core';
import React from 'react';
import _ from 'lodash';

interface IResultsData {
  component: string,
  rating: number
}

const useStyles = makeStyles(() => ({
    table: {
      minWidth: 200,
    }
  }))

const ResultsDataTable = () => {
    const classes = useStyles();
    const [results, setResults] = React.useState<IResultsData[]>([])
  
    React.useEffect(() => {
      setResults(_.map(tabs, (tab) => {
        return {
          component: tab.name,
          rating: getRating(JSON.parse(localStorage.getItem(tab.name) || '[]'))
        }
      }))
    }, [])
  
  
    return (
    <Grid lg={5} item>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Component</TableCell>
                    <TableCell align="right">Rating</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {results.map(row => (
                    <TableRow key={row.component}>
                    <TableCell component="th" scope="row">
                        {row.component}
                    </TableCell>
                    <TableCell align="right">{row.rating}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Grid>
    )
}

export default ResultsDataTable
