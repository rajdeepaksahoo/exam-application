import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExamService } from '../service/exam.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogForSubmitComponent } from '../dialog-for-submit/dialog-for-submit.component';
@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit,OnDestroy{
  endTime = new Date(Date.now() + 60000);
  questionList:any[]=[]
  form!: FormGroup;
  submitExam=false
  count=0
  examStarted=false
  streams!:any
  noOfQuestions:number=10
  examStream!:string
  elegibleToStart = (this.examStream!==undefined || this.examStream!=='' ) && (this.noOfQuestions!==0 || this.noOfQuestions!==undefined)
  constructor(public dialog: MatDialog,private service:ExamService,private fb : FormBuilder,private toastr: ToastrService,private router:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      this.toastr.warning('Please Login To Start Examination-')
      this.router.navigateByUrl('')
   }
    this.service.getLovs().subscribe(res=>{
      this.streams=res
    })
    this.form = this.fb.group({
      questions: this.fb.array([])
    });
    
    // this.getQuestionsByStreamAndNumber("java",5);
    this.initializeForm()
    
    
  }
  initializeForm() {

    const questionsArray = this.form.get('questions');
    console.log('initializeForm questionsArray : ',questionsArray);
    console.log('Token : ',localStorage.getItem('token'))
   
    if (questionsArray) { // Check if questionsArray is not null
      console.log('initializeForm questionList : ',this.questionList);
      
      this.questionList.forEach(question => {
        const questionGroup = this.fb.group({
          questionText: [question.question,],
          selectedOption: ['', ],
          options: this.fb.group({
            option1: [question.options.option1],
            option2: [question.options.option2],
            option3: [question.options.option3],
            option4: [question.options.option4]
          }),
          correctAnswer: [question.answer.answer]
        });
        (questionsArray as FormArray).push(questionGroup);
      });
    }
  }
  
  
  getQuestionsByStreamAndNumber(stream:string,questions:number){
    this.service.getQuestionsByStreamAndNumberOfQuestions(stream,questions).subscribe((res:any)=>{
      console.log(res);
      console.log(res.length*6000);
      this.endTime= new Date(Date.now() + (20000*res.length))
      this.startTimer();
      // this.endTime= new Date(Date.now() + (6000))
      this.questionList = res;
      this.initializeForm()
    })
  }
  get questionsFormArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }
  onSubmit() {
    if (this.form.valid) {
      const selectedValues = this.form.value.questions.map((question: any) => question.selectedOption);
      console.log('Selected Values:', selectedValues);
  
      // Process the form data
      console.log('Form submitted:', this.form);
      this.service.getResult({questionSet:this.questionList,givenAnswers:selectedValues}).subscribe((res:any)=>{
        
        var securedMark:Number= res.securedMark
        var correctAnswers:Number= res.correctAnswers
        console.log(res," securedMark : ",securedMark+"");
        this.toastr.show("You Secured : ",securedMark+"")
        this.toastr.show("Total Correct Answers : ",correctAnswers+"")
        this.openDialog(res)
        this.examStarted=false
      })
    } else {
    }
  }
    remainingTime!: { hours: number, minutes: number, seconds: number };

  private timerSubscription!: Subscription;

  ngOnDestroy(): void {
    console.log('destroied');
    
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe();
    }
    localStorage.clear()
  }
  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date().getTime();
      const difference = this.endTime.getTime() - now;
  
      // Calculate remaining time in hours, minutes, and seconds
      const totalSeconds = Math.max(0, Math.floor(difference / 1000));
      this.remainingTime = {
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60
      };
      if(this.remainingTime.hours===0 && this.remainingTime.minutes==0 && this.remainingTime.seconds==0){
       this.submitExam=true
       this.count++
      }

      if(this.submitExam && this.count===1 && this.examStarted){
        this.onSubmit()
        this.submitExam=false
        // this.router.navigateByUrl("")
      }

    });
  }
  openDialog(res:any): void {
    const dialogRef =  this.dialog.open(DialogForSubmitComponent, {
      width: '450px',
      data:{res}
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.clear
      this.router.navigateByUrl('')
    });
  }

  startExam(){       
    this.getQuestionsByStreamAndNumber(this.examStream,this.noOfQuestions)
    this.examStarted=true
  }
}
