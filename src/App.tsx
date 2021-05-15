import React from 'react';
import './App.scss';
import {PeopleFill} from "react-bootstrap-icons";
import { useEmployeeData}  from "./hooks/useEmployeeData";
import EmployeeTable from "./component/EmployeeTable";
import {Alert} from "react-bootstrap";

const App = () => {

  const {employeeData, totalEmployee, newJoinedEmployee, highestSalaryEmployee} = useEmployeeData();


  return (
    <div className="container">
       <div className="c-row">
          <Alert alt={"Total Employee"} variant="primary" className="c-row header--count"> 
            <PeopleFill data-testid="total_employee" size={50} /> 
            <h2 >{totalEmployee}</h2>
          </Alert>
          <Alert variant="primary" className="c-col header--info">
            <div className="c-row">
              <div className="c-label">Highest Earning Employee :</div> 
              <div className="c-value">{highestSalaryEmployee?.fullname}</div>
            </div>
            <div className="c-row">
              <div className="c-label">Most Recent Joined Employee :</div>
              <div className="c-value">{newJoinedEmployee?.fullname}</div>
            </div>
          </Alert>
      </div>
      <EmployeeTable data={employeeData}></EmployeeTable>
     
    </div>
  );
}

export default App;
