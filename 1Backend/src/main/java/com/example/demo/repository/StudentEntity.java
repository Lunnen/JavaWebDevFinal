package com.example.demo.repository;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity(name="students")
public class StudentEntity implements Serializable {

    @Id
    @GeneratedValue
    private long id;

    @Column(length=50, unique = true, nullable = false)
    private String studentId;

    @Column(length=50, nullable = false)
    private String name;

    @Column(length=50, nullable = false)
    private String lastName;

    @Column(length=3, nullable = false)
    private int age;

    @NotNull
    @Column(nullable = false)
    private boolean present;

    public String getStudentId() {
        return studentId;
    }

    @JsonProperty("student_id")
    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    @JsonProperty("last_name")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
