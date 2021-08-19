import React from "react";
import styled from "styled-components";
import { useTable } from "react-table";

const TableWrapper = styled.div`
  position: relative;
  max-width: 1024px;
  max-heigth: 720px;
  margin: auto;
  top: 200px;
  box-shadow: 0px 0px 2px 1px rgba(34, 60, 80, 0.1);
`;
const SearchInput = styled.input`
  border: none;
  height: 50px;
  border-bottom: 1px solid #eee;
  margin-bottom:10px;
  &:focus {
    outline: none;
  }
`;

const Table = ({ columns, data }) => {
  console.log(data);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
console.log(rows);
  return (
    <>
      <TableWrapper>
        <SearchInput placeholder={"Enter employee"}></SearchInput>
        <table  {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                console.log(column)
               return <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                              console.log(cell);

                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </TableWrapper>
    
    </>
  );
};

export default Table;
