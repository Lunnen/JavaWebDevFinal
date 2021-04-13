package com.example.demo.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.validation.constraints.*;

public class RequestModel {

    @Column(length=50, unique = true, nullable = false)
    private String studentId;

    @Size(min=2, max=50, message="Please enter a correct first name")
    @Column(length=50, nullable = false)
    private String name;

    @Size(min=2, max=50, message="Please enter a correct last name")
    @Column(length=50, nullable = false)
    private String lastName;

    @Min(value=0, message = "An age of 1 or higher is required.")
    @Max(125)
    @Column(nullable = false)
    private int age;

    @Column(nullable = false)
    private boolean present;

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    @JsonProperty("last_name")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }


}
