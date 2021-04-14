package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<StudentEntity, String> {

    Optional<StudentEntity> findByStudentId(String studentId);

    List<StudentEntity> findAll();

}
