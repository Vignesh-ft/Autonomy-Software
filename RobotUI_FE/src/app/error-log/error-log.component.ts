import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css'
})
export class ErrorLogComponent {
  errorLogData: any[] = [];
  deleteErrorLogId:any
  errorPopupState = false
  deleteAllState = false

  private apiUrl = `http://${environment.API_URL}:${environment.PORT}/errorlogs`;

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void{
    fetch(this.apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched Data:', data); // Log the data to verify the structure
      this.errorLogData = data;
    })
    .catch(error => {
      console.error('Error fetching mission logs:', error);
    });
  }

  getDeleteErrorId(order:any) {
    this.deleteErrorLogId = order
    this.errorPopup()
  }


  errorPopup() {
    this.errorPopupState = !this.errorPopupState
  }

  deleteAllPopup() {
    this.deleteAllState = !this.deleteAllState
  }



  errorLogDownload(order:any){
    console.log("Your File is Downloading")
    setTimeout(()=>{
      console.log("Downloaded Just text for testing")
    },4000)
  }


  deleteErrorLog(id:any) {
    this.errorLogData = this.errorLogData.filter(log => log.errororder !== id)
    this.errorPopup()
  }

  deleteAll() {
    this.errorLogData = []
    this.deleteAllPopup()
  }

}
