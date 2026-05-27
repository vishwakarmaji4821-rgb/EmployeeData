package com.employees.employeedata.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employees.employeedata.entity.Employee;
import com.employees.employeedata.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee saveEmployee(Employee employee) {

        return repository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {

        return repository.findAll();
    }

    @Override
    public Employee getEmployeeById(String id) {

        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteEmployee(String id) {

        repository.deleteById(id);
    }
}
