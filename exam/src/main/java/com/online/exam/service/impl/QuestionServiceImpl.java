package com.online.exam.service.impl;

import com.online.exam.model.Questions;
import com.online.exam.repository.QuestionRepository;
import com.online.exam.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;
    @Override
    public List<Questions> allQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Questions addQuestion(Questions questions) {
        return questionRepository.save(questions);
    }

    @Override
    public List<Questions> addAllQuestion(List<Questions> questions){
        List<Questions> questionList = new ArrayList<>();
        try {
           questionList = questionRepository.saveAll(questions);

        }catch (Exception e){
            e.printStackTrace();
        }
        return questionList;
    }

    @Override
    public String deleteQuestion(Long questionId){
        String result = "";
        try {
            if(questionRepository.findById(questionId).isPresent()){
                questionRepository.deleteById(questionId);
                result =questionId+" deleted successfully";
            }else{
                result =questionId+" is not available";
            }

        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public List<Questions> nNumberOfQuestions(Integer rowCount) {
        return questionRepository.nNumberOfQuestions(rowCount);
    }

    @Override
    public List<Questions> nNumberOfQuestionsWithStream(Integer rowCount,String stream) {
        return questionRepository.getQuestionsByStreamWithCount(rowCount,stream);
    }

    @Override
    public Long mark(List<Questions> questionSet, List<String> givenAnswers,Integer eachQuestionMark) {

        List<String> realAnswers = questionSet.stream().map(questions -> questions.getAnswer().getAnswer()).toList();
        return IntStream.range(0, Math.min(realAnswers.size(), givenAnswers.size()))
                .filter(i -> realAnswers.get(i).equals(givenAnswers.get(i)))
                .count();
    }

    @Override
    public List<String> getStreamLov() {
        return questionRepository.getStreamLov();
    }
}
