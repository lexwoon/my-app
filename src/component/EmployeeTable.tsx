import './EmployeeTable.scss';
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs';
import ascImg from "../assets/images/asc.png";
import descImg from "../assets/images/desc.png";
import noSortImg from "../assets/images/no_sort.png";

export const SortEnum = {
  ASC: "asc",
  DESC: "desc"
}

interface SortInfo { index?: number, sortType?: string }

const EmployeeTable = ({ data }: {data: Array<any>}) => {

  const headers: string[] = ["fullname", "dateJoinedUtc", "salary"]
  const dateFormatter = new Intl.NumberFormat("en-MY", { style: 'currency', currency: 'MYR' });
  const [sortHeader, setSortHeader] = useState<SortInfo>()
  const [sortedIndexMapping, setSortedIndexMapping] = useState <Array<number>>([]);

  useEffect(()=>{
    let initialSortHeader: SortInfo = {index:1, sortType: SortEnum.DESC}  
    setSortHeader(initialSortHeader) ;
    sortData(initialSortHeader);
  },[])

  const comparator = (source: Array<any>, headerName: string, x: number, y: number) => {
    let aObj = source[x][headerName];
    let bObj = source[y][headerName];
    return typeof aObj === "number" ?
      compareNumber(aObj, bObj) :
      compare(aObj, bObj);
  }

  const compare = (a: any, b: any) => {
    return String(a).toString().localeCompare(b);
  }

  const compareNumber = (a: number, b: number) => {
    return a - b;
  }

  const sortData = (currSortHeader: SortInfo) => {
    let indexMap: Array<number> = data ? data.map((_, index) => { return index }) : [];
    if (typeof currSortHeader.index === "number") {
      let headerIndex: number = currSortHeader.index;
      indexMap.sort((a, b) => {
        return currSortHeader.sortType === SortEnum.ASC ?
          comparator(data, headers[headerIndex], a, b) :
          comparator(data, headers[headerIndex], b, a)
      });
    }
    setSortedIndexMapping(indexMap);
  }

  const generateRow = (sortedIndexMap: Array<number>) => {
    if (!sortedIndexMap || sortedIndexMap.length === 0 ) {
      sortedIndexMap = data ? data.map((_, index) => { return index }) : [];
    } 
      return sortedIndexMap.map((rowIndex, index) => {
        return (
          <tr key={`tr_${index}`}>
            <td>{getData(rowIndex,0)}</td>
            <td>{dayjs(getData(rowIndex,1)).format("dddd, MMMM D, YYYY h:mm A")}</td>
            <td>{dateFormatter.format(getData(rowIndex,2))}</td>
          </tr>
        )
      })
   
  }

  const getData = (rowIndex: number, colIndex: number, ) => {
      return data[rowIndex][headers[colIndex]];
  }

  const sortColumn = (index: number) => {
    let currSortHeader: { index?: number, sortType?: string } = { ...sortHeader };
    if (currSortHeader?.index === index) {
      if (currSortHeader.sortType === SortEnum.ASC) {
        currSortHeader = { index, sortType: SortEnum.DESC }
      } else {
        currSortHeader = { index: undefined, sortType: undefined };
      }
    } else {
      currSortHeader = { index, sortType: SortEnum.ASC }
    }
    setSortHeader(currSortHeader);

    sortData(currSortHeader);
  }

  const getSortImg = (sortType: string | undefined) => {
    if (sortType === SortEnum.ASC) {
      return ascImg;
    } else if (sortType === SortEnum.DESC) {
      return descImg;
    } else {
      return noSortImg;
    }

  }

  const getSortType = (index: number) => {
    if (sortHeader && sortHeader.index === index) {
      return sortHeader.sortType;
    } else {
      return undefined;
    }
  }

  const HeaderCell = React.memo((props: { children: React.ReactNode, colIndex: number, sortType: string | undefined, styles?: string }) => {
    const sortImg = getSortImg(props.sortType);
    return (
      <th className={props.styles} onMouseDown={() => sortColumn(props.colIndex)}>
        <span>{props.children}</span>
        <img className="sortImg" alt={`${props.sortType}`} src={sortImg} />
      </th>
    )
  })

  return (<Table striped bordered hover data-testid="emp_table">
    <thead>
      <tr>
        <HeaderCell colIndex={0} sortType={getSortType(0)} styles="headerCell" >Full Name</HeaderCell>
        <HeaderCell colIndex={1} sortType={getSortType(1)} styles="headerCell" >Date Joined</HeaderCell>
        <HeaderCell colIndex={2} sortType={getSortType(2)} styles="headerCell" >Salary</HeaderCell>
      </tr>
    </thead>
    <tbody>
      {generateRow(sortedIndexMapping)}
    </tbody>
  </Table>)

}

export default EmployeeTable;