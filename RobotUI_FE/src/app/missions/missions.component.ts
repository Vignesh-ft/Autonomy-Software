import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {

  constructor(private router:Router, private cookieService: CookieService ){}

  navigateMission(id: any,name: any) {
    this.router.navigate(['/app/setup/missions/create-missions'],{queryParams: {id: id, name: name}})
  }


  errorMessage = ""
  missionName =""
  misisonId = 0
  createMissionPopupState = false
  createMissionDropDown = false
  missionQueueState = false
  deleteMissionPopupState = false

  dropDownOptions = [
    {
      ddOrder: 0,
      title: "Urapakkam Shop Floor",
    },
    {
      ddOrder: 1,
      title: "Vallam Shop Floor",
    },
    {
      ddOrder: 2,
      title: "Urapakkam Testing Area"
    }
  ]

  createPopup() {
    this.createMissionPopupState = !this.createMissionPopupState
  }

  createPopupDD() {
    this.createMissionDropDown = !this.createMissionDropDown
  }

  defaultSite = this.dropDownOptions[0].title

  changeSiteName(order:any){
    this.defaultSite = this.dropDownOptions[order].title
    this.createPopupDD()
  }

  missionData = [
    {
      missionId: 0,
      missionName: "First Row",
      mapName: "Urapakkam Shop Floor",
      site: "Urapakkam",
      location: "MATE U1",
      createdBy: "User",
      createdOn: "DD/MM/YYYY HH:MM",
      actions: [

      ]
    },
    {
      missionId: 1,
      missionName: "Second Row",
      mapName: "Urapakkam Shop Floor",
      site: "Urapakkam",
      location: "MATE U1",
      createdBy: "Maintainer",
      createdOn: "DD/MM/YYYY HH:MM"
    },
    {
      missionId: 2,
      missionName: "Third Row",
      mapName: "Urapakkam Shop Floor",
      site: "Urapakkam",
      location: "MATE U1",
      createdBy: "Adminsitrator",
      createdOn: "DD/MM/YYYY HH:MM"
    },
  ]


  createMission() {
    if(this.missionName === ""){
      this.errorMessage = "Enter the Mission name"
    }
    setTimeout(()=>{
      this.errorMessage = ""
    },4000)

    if(this.missionName !== "") {
      this.misisonId = this.missionData[this.missionData.length-1].missionId + 1
      let schema = {
        missionId: this.misisonId,
        missionName: this.missionName,
        mapName: this.defaultSite,
        site: "Urapakkam",
        location: "MATE U1",
        createdBy: "User",
        createdOn: "DD/MM/YYYY HH:MM",
      }
      this.missionData = [...this.missionData, schema]
      console.log(this.missionData)
      this.createPopup()
    }
  }

  missionQueuePopup() {
    this.missionQueueState = !this.missionQueueState
  }

  deletePopup() {
    this.deleteMissionPopupState = !this.deleteMissionPopupState
  }



}
