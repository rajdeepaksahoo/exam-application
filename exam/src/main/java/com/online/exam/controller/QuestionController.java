package com.online.exam.controller;

import com.online.exam.dto.GetResultDto;
import com.online.exam.model.Questions;
import com.online.exam.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class QuestionController {
    private final QuestionService questionService;
    @GetMapping("/allQuestions")
    public ResponseEntity<List<Questions>> allQuestions(){
        //Service Call
        List<Questions> questions = questionService.allQuestions();
        Collections.shuffle(questions);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }
    @PostMapping("/addQuestion")
    public ResponseEntity<Questions> addQuestion(@RequestBody Questions question){
        return new ResponseEntity<>(questionService.addQuestion(question),HttpStatus.CREATED);
    }

    @PostMapping("/addAllQuestion")
    public ResponseEntity<List<Questions>> addQuestion(@RequestBody List<Questions> question){
        return new ResponseEntity<>(questionService.addAllQuestion(question),HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{questionId}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long questionId){
        return new ResponseEntity<>(questionService.deleteQuestion(questionId),HttpStatus.OK);
    }
    @GetMapping("/questions/{rowCount}")
    public ResponseEntity<List<Questions>> numberOfQuestions(@PathVariable Integer rowCount){
        return new ResponseEntity<>(questionService.nNumberOfQuestions(rowCount),HttpStatus.CREATED);
    }

    @GetMapping("/questions/{rowCount}/{stream}")
    public ResponseEntity<List<Questions>> questionsByStream(@PathVariable Integer rowCount,@PathVariable String stream){
        return new ResponseEntity<>(questionService.nNumberOfQuestionsWithStream(rowCount,stream),HttpStatus.CREATED);
    }

    @PostMapping("/getResult/{eachQuestionMark}")
    public ResponseEntity<Map<String,Long>> getResult(@RequestBody GetResultDto getResultDto, @PathVariable Integer eachQuestionMark){
        Map<String,Long> response = new HashMap<>();
        Long correctAnswers = questionService.mark(getResultDto.getQuestionSet(), getResultDto.getGivenAnswers(), eachQuestionMark);
        response.put("questionAttended", (long) getResultDto.getGivenAnswers().size());
        response.put("correctAnswers", correctAnswers);
        Long securedMark = correctAnswers*eachQuestionMark;
        response.put("securedMark",securedMark);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    @GetMapping("/lov")
    public ResponseEntity<List<String>> getStreamLov(){
        return new ResponseEntity<>(questionService.getStreamLov(),HttpStatus.OK);
    }
}
