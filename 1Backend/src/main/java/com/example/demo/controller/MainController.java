package com.example.demo.controller;

import com.example.demo.model.RequestModel;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.Service;
import com.example.demo.shared.StudentDto;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class MainController {

     private final Service studentService;
     public MainController(Service studentService){ // better with dependancy (construktor) than @autowired. Cleaner code.
         this.studentService = studentService;
     }

    @GetMapping
    public List<ResponseModel> getAllStudents() {

        //Get Dto from Database
        List<StudentDto> studentDtoListOut = studentService.getAll();
        List<ResponseModel> response = new ArrayList<>();

        int position = 0;
        for(StudentDto studentDto : studentDtoListOut) {
            response.add(new ResponseModel());
            BeanUtils.copyProperties(studentDto, response.get(position));
            position++;
        }
         return response;
    }

    @GetMapping(value = "/{student_id}")
    public ResponseModel getSpecStudent(@PathVariable("student_id") String student_id) {
        StudentDto studentDtoOut;
        ResponseModel response = new ResponseModel();

        studentDtoOut = studentService.getSpecific(student_id);

        BeanUtils.copyProperties(studentDtoOut, response);
        return response;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseModel addStudent(@Valid @RequestBody RequestModel DetailsModel){

        StudentDto DtoIn = new StudentDto();
        BeanUtils.copyProperties(DetailsModel, DtoIn);

        StudentDto DtoOut = studentService.addStudent(DtoIn);

        ResponseModel response = new ResponseModel();
        BeanUtils.copyProperties(DtoOut, response);

        return response;
    }

    @PutMapping(value = "/{student_id}")
    public void updateStudent(@Valid @PathVariable("student_id") String student_id, @Valid @RequestBody RequestModel detailsModel){
        // copy json to dto in
        StudentDto dtoIn = new StudentDto();
        BeanUtils.copyProperties(detailsModel, dtoIn);

        studentService.updateStudent(student_id, dtoIn);
    }

    @DeleteMapping(path = "{student_id}")
    public void deleteStudent(@PathVariable("student_id") String student_id) {
        studentService.deleteStudent(student_id);
    }

}
