import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.css'
})
export class TransitionComponent implements OnInit {
  cookieValue: any;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    try {
      this.cookieValue = JSON.parse(this.cookieService.get("_user"));
    } catch (error) {
      console.error("Error parsing cookie:", error);
      this.cookieValue = null;
    }
  }

  transitionName = ""
  errorMessage = ""
  transitionId = 0

  createPopupState = false
  editPopupState = false
  deletePopupState = false

  startPositionPopupOCstate = false
  endPositionPopupOCstate = false

  startPosition:any = "No Position is Selected"
  endPosition:any = "No Position is Selected"


  // Edit Option Parameters
  editTransitionId = 0
  editTransitionName = ""
  editStartPos = ""
  editEndPos = ""

  deleteTransitionID = 0


  startPositionPts = [
    {
      ptsId: 0,
      ptName: "Point 1"
    },
    {
      ptsId: 1,
      ptName: "Point 2"
    },
    {
      ptsId: 2,
      ptName: "Point 3"
    },
    {
      ptsId: 3,
      ptName: "Point 4"
    },
    {
      ptsId: 4,
      ptName: "Point 5"
    },
  ]

  endPositionPts = [
    {
      ptsId: 0,
      ptName: "Point 1"
    },
    {
      ptsId: 1,
      ptName: "Point 2"
    },
    {
      ptsId: 2,
      ptName: "Point 3"
    },
    {
      ptsId: 3,
      ptName: "Point 4"
    },
    {
      ptsId: 4,
      ptName: "Point 5"
    },
  ]


  transitionData:any = [
    {
      transitionId: 0,
      transitionName: "Test 1",
      startPos: "Point 1",
      endPos: "Point 2",
      createdBy: "Admin",
      createdOn: "DD/MM/YYYY HH:MM",
    },
    {
      transitionId: 1,
      transitionName: "Test 2",
      startPos: "Point 1",
      endPos: "Point 2",
      createdBy: "User",
      createdOn: "DD/MM/YYYY HH:MM",
    }
  ]

  startPositionOC() {
    this.startPositionPopupOCstate = !this.startPositionPopupOCstate
  }

  endPositionOC() {
    this.endPositionPopupOCstate = !this.endPositionPopupOCstate
  }

  changeStartPos(order:any) {
    this.startPosition = this.startPositionPts[order].ptName
  }

  changeEndPos(order:any) {
    this.endPosition = this.endPositionPts[order].ptName
  }

  changeEditStartPos(order:any) {
    this.editStartPos = this.startPositionPts[order].ptName
  }

  changeEditEndPos(order:any) {
    this.editEndPos = this.endPositionPts[order].ptName
  }


  createPopup() {
    this.createPopupState = !this.createPopupState
    // Getting the value to default

    if(this.transitionName === ""){
      this.transitionName = ""
      this.startPosition = "No Position is Selected"
      this.endPosition = "No Position is Selected"
    }

  }

  createTransition() {
    this.transitionId = this.transitionData[this.transitionData.length-1].transitionId+1
    console.log(this.transitionId)
    let Schema:any = {
      transitionId: this.transitionId,
      transitionName: this.transitionName,
      startPos: this.startPosition,
      endPos: this.endPosition,
      createdBy: this.cookieValue.name,
      createdOn: "DD/MM/YYYY HH:MM",
    }

    this.transitionData = [...this.transitionData, Schema]
    console.log(this.transitionData)
    console.log(this.transitionData.length)


    // Getting the value to default
    this.transitionName = ""
    this.startPosition = "No Position is Selected"
    this.endPosition = "No Position is Selected"
  }


  validateValue() {
    let isValidate:boolean = false

    if(this.transitionName === "") {
      this.errorMessage = "*Enter Transition Name"
    }

    else if(this.startPosition === "No Position is Selected") {
      this.errorMessage = "*Select the Starting Position"
    }

    else if(this.endPosition === "No Position is Selected") {
      this.errorMessage = "*Select the Ending Position"
    }

    else if(this.startPosition === this.endPosition){
      this.errorMessage = "*Give Different Points to create"
    }

    setTimeout(()=>{this.errorMessage = ""},4000)

    if(this.transitionName && this.startPosition !== "No Position is Selected" && this.endPosition != "No Position is Selected" && this.startPosition !== this.endPosition )
    {
      isValidate = true
    }

    if(isValidate) {
      this.createTransition()
      this.createPopup()
    }


    this.startPositionPopupOCstate = false
    this.endPositionPopupOCstate = false
  }

  editValidateValue() {
    let isValidate:boolean = false

    if(this.editTransitionName === "") {
      this.errorMessage = "*Enter Transition Name"
    }

    else if(this.editStartPos === this.editEndPos){
      this.errorMessage = "*Give Different Points to create"
    }

    setTimeout(()=>{this.errorMessage = ""},4000)

    if(this.editTransitionName && this.editEndPos !== this.editStartPos )
    {
      isValidate = true
    }

    if(isValidate) {
      this.editTransition(this.editTransitionId)
      this.editPopup()
    }


    this.startPositionPopupOCstate = false
    this.endPositionPopupOCstate = false
  }


  getEditTransition(index:number) {
    this.editPopup()
    this.editTransitionId = this.transitionData[index].transitionId
    this.editTransitionName = this.transitionData[index].transitionName
    this.editStartPos = this.transitionData[index].startPos
    this.editEndPos = this.transitionData[index].endPos
    console.log([this.editTransitionName, this.editTransitionId, this.editStartPos, this.editEndPos])
    console.log(index)
  }

  editTransition(index:number){
    this.transitionData[index].transitionName = this.editTransitionName
    this.transitionData[index].startPos = this.editStartPos
    this.transitionData[index].endPos = this.editEndPos
  }

  getTransitionId(order:any) {
    this.deleteTransitionID = order
    this.deletePopup()
  }


  deleteTransition(order:any) {
    console.log(this.transitionData[order])
    this.deletePopup()
  }

  editPopup() {
    this.editPopupState = !this.editPopupState
  }

  deletePopup() {
    this.deletePopupState = !this.deletePopupState
  }

}