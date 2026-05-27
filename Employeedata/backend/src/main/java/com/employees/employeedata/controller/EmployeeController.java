package com.employees.employeedata.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.employees.employeedata.entity.Employee;
import com.employees.employeedata.service.EmployeeService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @PostMapping
    public Employee saveEmployee(@RequestBody Employee employee) {

        return service.saveEmployee(employee);
    }

    @GetMapping
    public List<Employee> getAllEmployees() {

        return service.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return service.getEmployeeById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable String id) {
        service.deleteEmployee(id);
        return "Deleted Successfully";
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable String id, @RequestBody Employee emp) {
        emp.setId(id);
        return service.saveEmployee(emp);
    }
}
