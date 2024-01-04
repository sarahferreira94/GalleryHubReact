import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const ReactVirtualizedTable = ({ data }) => {
  const columns = [
    {
      width: 20,
      label: 'ID',
      dataKey: 'idartwork',
    },
    {
      width: 200,
      label: 'Name',
      dataKey: 'name',
      numeric: false,
    },
    {
      width: 60,
      label: 'Period',
      dataKey: 'date',
      numeric: true,
    },
    {
      width: 120,
      label: 'Country',
      dataKey: 'country',
      numeric: false,
    },
    {
      width: 120,
      label: 'Owner',
      dataKey: 'owner',
      numeric: false,
    },
  ];

  // Transformando os dados fornecidos em linhas para a tabela
  const rows = data?.map((artwork) => ({
    idartwork: artwork.idartwork,
    name: artwork.name,
    date: artwork.date || '', // Se a data estiver ausente, pode ser uma string vazia ou um valor padrão desejado
    country: artwork.country || '',
    owner: artwork.owner || '',
  }));

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Paper style={{ height: '54vh', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                size='small'
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={(index, row) => (
          <React.Fragment>
            {columns.map((column) => (
              <TableCell
                size='small'
                key={column.dataKey}
                align={column.numeric || false ? 'right' : 'left'}
              >
                {row[column.dataKey]}
              </TableCell>
            ))}
          </React.Fragment>
        )}
      />
    </Paper>
  );
};

export default ReactVirtualizedTable;
