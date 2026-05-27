package com.employees.employeedata.service;

import java.util.List;
import com.employees.employeedata.entity.Employee;

public interface EmployeeService {

    Employee saveEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(String id);
    void deleteEmployee(String id);
}
