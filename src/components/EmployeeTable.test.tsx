import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeTable from './EmployeeTable';
import { mount } from 'enzyme';

const mockNoData: any[] = [];
const mockData = [
    {
      "id": 9000,
      "employeeId": "07f17d85-d8d9-4802-8db9-e1d50f96ae4b",
      "fullname": "James Bond",
      "firstname": "James",
      "lastname": "Bond",
      "dateJoined": "Saturday, 15 May 2021 02:27:03 GMT+08:00 (Malaysia Time)",
      "dateJoinedUTC": "1621016823000",
      "salary": 1000
    },
    {
      "id": 9001,
      "employeeId": "66bd4320-4075-4d87-873e-5bc9e9843744",
      "fullname" : "Super Man",
      "firstname": "Super",
      "lastname": "Man",
      "dateJoined": "Thursday, 15 April 2021 02:27:03 GMT+08:00 (Malaysia Time)",
      "dateJoinedUTC": "1618424823000",
      "salary": 10000
    },
    {
      "id": 9002,
      "employeeId": "66bd4320-4075-4d87-873e-5bc9e9843745",
      "fullname" : "Aqua Man",
      "firstname": "Aqua",
      "lastname": "Man",
      "dateJoined": "Thursday, 15 April 2021 02:27:03 GMT+08:00 (Malaysia Time)",
      "dateJoinedUTC": "1618424823000",
      "salary": 9999
    } ];

test('renders header full name', () => {
    render(<EmployeeTable data={mockData} />);
    const linkElement = screen.getByText(/full name/i);
    expect(linkElement).toBeInTheDocument();
  }); 

  test('renders header Date Joined', () => {
    render(<EmployeeTable data={mockData} />);
    const linkElement = screen.getByText(/date joined/i);
    expect(linkElement).toBeInTheDocument();
  }); 

  test('renders header Salary', () => {
    render(<EmployeeTable data={mockData} />);
    const linkElement = screen.getByText(/salary/i);
    expect(linkElement).toBeInTheDocument();
  }); 

  test('renders table with record', () => {
    const {container} = render(<EmployeeTable data={mockData} />);
    expect(container.querySelector('td')).toBeInTheDocument();
  });


  test('renders table with 3 records', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr');
    expect(row).toHaveLength(3);
  });

  test('renders table check first record', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr').first();
    const cell = row.find('td').first();
    expect(cell.text()).toBe("James Bond");
  });

  test('renders table check last record', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr').last();
    const cell = row.find('td').first();
    expect(cell.text()).toBe("Aqua Man");
  });

  test('test 1 click header', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    let tableHeader = wrapper.find('th').first();
        tableHeader.simulate('mousedown');
        tableHeader = wrapper.find('th').first();
    const ascImg = tableHeader.children().find('img');
    const srcProp = ascImg.prop('src');
    expect(srcProp).toBe('asc.png');

    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr').first();
    const cell = row.find('td').first();
    expect(cell.text()).toBe("Aqua Man");
  });

  test('test 2 clicks header', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    let tableHeader = wrapper.find('th').first();
    for (let i=0; i < 2 ;i++) {
      tableHeader.simulate('mousedown');
      tableHeader = wrapper.find('th').first();
    }
    const ascImg = tableHeader.children().find('img');
    const srcProp = ascImg.prop('src');
    expect(srcProp).toBe('desc.png');

    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr').first();
    const cell = row.find('td').first();
    expect(cell.text()).toBe("Super Man");
  });

  test('test 3 clicks header', () => {
    const wrapper = mount(<EmployeeTable data={mockData} />);
    let tableHeader = wrapper.find('th').first();
    for (let i=0; i < 3 ;i++) {
      tableHeader.simulate('mousedown');
      tableHeader = wrapper.find('th').first();
    }
    const ascImg = tableHeader.children().find('img');
    const srcProp = ascImg.prop('src');
    expect(srcProp).toBe('no_sort.png');

    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr').first();
    const cell = row.find('td').first();
    expect(cell.text()).toBe("James Bond");
  });

  test('renders table with no record', () => {
    const wrapper = mount(<EmployeeTable data={[]} />);
    const tbody = wrapper.find('tbody');
    const row = tbody.find('tr');
    expect(row).toHaveLength(0);
  });


