package com.example.demo.service;

import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.StudentEntity;
import com.example.demo.shared.StudentDto;
import com.example.demo.shared.Util;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class Service {

    private final StudentRepository studentRepository;
    private final Util util;

    public Service(StudentRepository studentRepository, Util util){
        this.studentRepository = studentRepository;
        this.util = util;
    }

    public List<StudentDto> getAll() {

        checkEmpty();

        //Get everything from the database as an antity
        List<StudentEntity> studentEntityListOut = new ArrayList<>(studentRepository.findAll());

        //Map EntityList to DtoList
        List<StudentDto> studentDtoListOut = new ArrayList<>();

        int position = 0;
        for(StudentEntity studentEntity : studentEntityListOut) {
            studentDtoListOut.add(new StudentDto());
            BeanUtils.copyProperties(studentEntity, studentDtoListOut.get(position));
            position++;
        }
        return studentDtoListOut;
    }

    public StudentDto getSpecific(String inputId) {

        checkIfFound(inputId);
        StudentEntity studentEntityOut = studentRepository.findByStudentId(inputId).orElseThrow();
        StudentDto studentDtoOut = new StudentDto();

        BeanUtils.copyProperties(studentEntityOut, studentDtoOut);

        return studentDtoOut;
    }

    public StudentDto addStudent(StudentDto inputIn) {

        String i = inputIn.getStudentId();

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

    public void checkEmpty () {
        if(!studentRepository.findAll().iterator().hasNext()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected table is empty......");
        }
    }
}
