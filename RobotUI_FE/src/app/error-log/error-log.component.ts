import { Component } from '@angular/core';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css'
})
export class ErrorLogComponent {
  errorLogData = [
  {
    errororder: 0,
    moduleName:"Mission Controller 1",
    desc: "Misssing",
    time: "DD/MM/YYYY HH:MM",
  },
  {
    errororder: 1,
    moduleName:"Mission Controller 2",
    desc: "Misssing",
    time: "DD/MM/YYYY HH:MM",
  },
  {
    errororder: 2,
    moduleName:"Mission Controller 3",
    desc: "Misssing",
    time: "DD/MM/YYYY HH:MM",
  },
  {
    errororder: 3,
    moduleName:"Mission Controller 4",
    desc: "Misssing",
    time: "DD/MM/YYYY HH:MM",
  },
  ]


  deleteErrorLogId:any
  errorPopupState = false
  deleteAllState = false


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
