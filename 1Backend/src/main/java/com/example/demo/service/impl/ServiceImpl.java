package com.example.demo.service.impl;

import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.entity.StudentEntity;
import com.example.demo.service.Service;
import com.example.demo.shared.dto.StudentDto;
import com.example.demo.shared.Util;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    private final StudentRepository studentRepository;
    private final Util util;

    public ServiceImpl(StudentRepository studentRepository, Util util){
        this.studentRepository = studentRepository;
        this.util = util;
    }

    public List<StudentEntity> getAll() {

        if (studentRepository.findAll().size() > 0) return studentRepository.findAll();
        else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empty table! Please add info.");
    }

    public Optional<StudentEntity> getSpecific(String inputId) {
        return Optional.ofNullable(checkIfFound(inputId));
    }

    public StudentDto addStudent(StudentDto inputIn) {

        Optional<StudentEntity> checkEntity = studentRepository.findByStudentId(inputIn.getStudentId());

            if (checkEntity.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID of " + inputIn.getStudentId() + " already exists!");
            }

        StudentEntity studEntity = new StudentEntity();

        BeanUtils.copyProperties(inputIn, studEntity);

        String inputID = Long.toString(inputIn.getId());
        String hashedProdId = util.generateHash(inputID);
        studEntity.setStudentId(hashedProdId.substring(3));

        StudentEntity studEntityOut = studentRepository.save(studEntity);
        StudentDto DtoOut = new StudentDto();
        BeanUtils.copyProperties(studEntityOut, DtoOut);
        return DtoOut;
    }

    public void updateStudent(String student_id, StudentDto inputDto) {

        StudentEntity StudentFound = checkIfFound(student_id);

        //Values have to be different to be updated
        StudentFound.setName(inputDto.getName() != null && (!inputDto.getName().equals(StudentFound.getName()) ) ? inputDto.getName() : StudentFound.getName());
        StudentFound.setLastName(inputDto.getLastName() != null && (!inputDto.getLastName().equals(StudentFound.getLastName()) ) ? inputDto.getLastName() : StudentFound.getLastName());
        StudentFound.setAge(inputDto.getAge() > 0 && (inputDto.getAge() != (StudentFound.getAge()) ) ? inputDto.getAge() : StudentFound.getAge());
        StudentFound.setPresent(StudentFound.isPresent() != (inputDto.isPresent()) ? inputDto.isPresent() : StudentFound.isPresent());

        studentRepository.save(StudentFound);
    }

    public void deleteStudent(String student_id) {
        studentRepository.delete(checkIfFound(student_id));
    }
    public StudentEntity checkIfFound (String inputID){
        return studentRepository.findByStudentId(inputID).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND, ("id "+inputID+" doesn't exist!") ));
    }
}
