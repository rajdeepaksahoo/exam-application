package com.online.exam.dto;

import com.online.exam.model.Questions;
import lombok.Data;

import java.util.List;

@Data
public class GetResultDto {
    List<String> givenAnswers;
    List<Questions> questionSet;

}
