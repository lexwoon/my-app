import testData from "../assets/data.json";
import {useState, useEffect} from "react";
import dayjs from "dayjs"
import maxBy from "lodash.maxby";

export const useEmployeeData = () => {

    const [employeeData, setEmployeeData] = useState<any>()

    useEffect(()=>{
        let data = testData.map((row) => {
            return {...row, fullname: `${row.firstname} ${row.lastname}`, dateJoinedUtc: dayjs(row.dateJoined).valueOf() }
        })
        data.sort((a,b) => { return (b.dateJoinedUtc - a.dateJoinedUtc) });
        setEmployeeData(data);
    },[])

    const totalEmployee = employeeData ? employeeData.length : 0;
    const newJoinedEmployee = employeeData ? employeeData[0] : null;
    const highestSalaryEmployee = employeeData ? maxBy(employeeData, (emp: any)=> { return emp.salary}) : null;
    return {employeeData, totalEmployee, newJoinedEmployee, highestSalaryEmployee};
}