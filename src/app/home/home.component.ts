import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  data: any[] = []; // Store the response text from the server
  private httpClient = inject(HttpClient);

  private apiLink: string = "https://transalateapi.vercel.app/translate";

  language: string = 'swahili'; // Store language to convert to(default==="swahili")
  inText: string =''; // Store the input sentences to be translated(input)
  outText: string = ''; // Store the translated text
  errorMsg:string = ''; // Store the error message

  copyShow: string = 'Copy';

  constructor( ) { }

 
  onChange(type: string,data: string){
    if(type=="inText"){

      if(data.length<3){
        this.outText = '';
        return;
      }
      this.inText = data;
      console.log(`[var] inText: ${this.inText}`);

      this.fetchData();
    }else if(type=="language"){
      this.language = data;
      console.log(`[var] language: ${this.language}`);
      this.fetchData(); // after some one click the language automatic fetch the translation
    }
  }

  copy(){
    // mechanism to copy the outText
    if(this.outText){
      // COPYING TO THE KEYBOARD MECHANISM


      //this.clipboardService.copyFromContent(this.outText);

      // NOW THE TEXT IS COPIED SHOW TO THE USER MECHANISM
      this.copyShow="Copied!";

      setTimeout(()=>{
          this.copyShow="Copy";
      },2000);

      console.log(`Copied "${this.outText}" to the keyboard!`);
  
    }


  }

  fetchData(): void {

    if(this.inText.length<3){
      this.outText='';
      return;
    }
    const postData = {
      language: this.language, 
      sentences: [this.inText] 
    };

    // Include headers directly in the request options
    const headers = {
      'Content-Type': 'application/json',
      // Other headers
    };



    // Make the POST request
    this.httpClient.post(this.apiLink, postData, { headers })
      .subscribe(
        (response: any) => {
          this.outText='';

          console.log(`1. Response from the server received successfully! for "${this.inText}"`);

          if(response['success']){
              this.errorMsg=''; // disable the error
              this.data=response['translations'];
              console.log(`2. Translated sentences translated successfully: "${this.data[0]}"`);

              // For now we have only one sentence
              this.outText = this.data[0];

          }else{
            this.errorMsg='Error occured while fetching translations';
            console.log(`2. Error occured on server: ${response['error']}`);
          }
        },
        (error) => {
          this.errorMsg=`You are Offline, Please connect to the Network!`;
          console.error('Error occurred on client:', error);
        }
      );
  }


}
