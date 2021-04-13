package com.example.demo.controller;

import com.example.demo.model.request.RequestModel;
import com.example.demo.model.response.ResponseModel;
import com.example.demo.repository.entity.StudentEntity;
import com.example.demo.service.Service;
import com.example.demo.shared.dto.StudentDto;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class MainController {

     private final Service studentService;
     public MainController(Service userService){ // better with dependancy (construktor) than @autowired. Cleaner code.
         this.studentService = userService;
     }

    @GetMapping
    public List<StudentEntity> getStudent() {
        return studentService.getAll();
    }

    @GetMapping(value = "/{student_id}")
    public Optional<StudentEntity> getSpecStudent(@PathVariable("student_id") String student_id) {
        return studentService.getSpecific(student_id);
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
    @ResponseStatus(HttpStatus.OK)
    public void updateStudent(@Valid @PathVariable("student_id") String student_id, @Valid @RequestBody RequestModel userDetailsModel){
        // copy json to dto in
        StudentDto userDtoIn = new StudentDto();
        BeanUtils.copyProperties(userDetailsModel, userDtoIn);

        studentService.updateStudent(student_id, userDtoIn);
    }

    @DeleteMapping(path = "{student_id}")
    public void deleteStudent(@PathVariable("student_id") String student_id) {
        studentService.deleteStudent(student_id);
    }
}
