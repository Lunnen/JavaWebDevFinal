package com.example.demo.service;

import com.example.demo.repository.entity.StudentEntity;
import com.example.demo.shared.dto.StudentDto;

import java.util.List;
import java.util.Optional;

public interface Service {

    List<StudentEntity> getAll();
    Optional<StudentEntity> getSpecific(String inputStudentId);

    StudentDto addStudent(StudentDto input);
    void updateStudent(String inputStudentId, StudentDto input);
    void deleteStudent(String inputStudentId);
}
