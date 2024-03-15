import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:9000"


  getHeader(){
    return  new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }


  getQuestionsByStreamAndNumberOfQuestions(stream:string,questions:number){
    const headers = this.getHeader()
    return this.http.get(`${this.baseUrl}/questions/${questions}/${stream}`,{ headers: headers })
  }
  // /getResult/{eachQuestionMark}

  getResult(restulDto:any){
    const headers = this.getHeader(); // Get headers
    const url = `${this.baseUrl}/getResult/2`; // Construct URL
    
    const options = {
      headers:headers
    };
  
    // Send POST request with options
    return this.http.post(url, restulDto, options);
  }
  getLovs(){
    const headers = this.getHeader(); 
    const url = `${this.baseUrl}/lov`; 
    const options = {
      headers:headers
    };
    return this.http.get(url, options);
  }
}
