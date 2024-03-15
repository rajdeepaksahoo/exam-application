import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { ExamComponent } from './exam/exam.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogForSubmitComponent } from './dialog-for-submit/dialog-for-submit.component';
import {MatSelectModule} from '@angular/material/select';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExamComponent,
    ToolBarComponent,
    HomeComponent,
    DialogForSubmitComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right', // Change the position to top right
        preventDuplicates: true, // Prevent duplicate toast notifications
        progressBar: true, // Show a progress bar
        timeOut: 3000, // Set the duration of the toast to 3 seconds
        closeButton: true, // Show close button
        tapToDismiss: false, // Disable tap to dismiss
        // You can add more configuration options here as needed
        // For color customization, you'll need to use custom CSS (see below)
      }
    ), // Import ToastrModule.forRoot()
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
