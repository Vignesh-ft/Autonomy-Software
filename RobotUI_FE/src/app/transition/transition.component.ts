import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrl: './transition.component.css',
  providers: [CookieService]
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
    this.fetchTransitions();
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


  fetchTransitions(): void {
    fetch('http://localhost:3000/transitions')
      .then(response => response.json())
      .then((transitions: any[]) => {
        this.transitionData = transitions.map(transition => {
          const dateString = transition.createdOn;
          console.log("Original Date from DB:", dateString);
  
          // Split the dateString into date and time parts
          const [datePart, timePart] = dateString.split(' ');
  
          // Split the date part into day, month, and year
          const [day, month, year] = datePart.split(':').map(Number);
  
          // Split the time part into hours and minutes
          const [hours, minutes] = timePart.split(':').map(Number);
  
          // Construct a new Date object
          const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  
          // Format the date
          const formattedDay = String(date.getUTCDate()).padStart(2, '0');
          const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
          const formattedYear = date.getUTCFullYear();
          const formattedHours = String(date.getUTCHours()).padStart(2, '0');
          const formattedMinutes = String(date.getUTCMinutes()).padStart(2, '0');
          const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}`;
  
          console.log("Formatted Date:", formattedDate);
  
          return {
            transitionId: transition._id, // Assuming MongoDB `_id` is used as transitionId
            name: transition.name || 'N/A',
            startPosition: transition.startPosition || 'N/A',
            endPosition: transition.endPosition || 'N/A',
            createdBy: transition.createdBy || 'Unknown',
            createdOn: formattedDate // Format createdOn date
          };
        });
      })
      .catch(error => {
        console.error('Error fetching transitions:', error);
      });
  }
  
  


//creating the new transition
  createTransition() {
    // Validate cookieValue and set createdBy
    let createdBy = "Unknown";
    const cookieValue = this.cookieService.get("_user");
  
    try {
      if (cookieValue) {
        const parsedCookie = JSON.parse(cookieValue);
        createdBy = parsedCookie.name || "Unknown";
      }
    } catch (e) {
      console.error('Error parsing cookie:', e);
    }
  
    // Validate form fields
    if (!this.transitionName.trim()) {
      this.errorMessage = "*Transition Name is required";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }
  
    if (this.startPosition === "No Position is Selected") {
      this.errorMessage = "*Select the Starting Position";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }
  
    if (this.endPosition === "No Position is Selected") {
      this.errorMessage = "*Select the Ending Position";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }
  
    if (this.startPosition === this.endPosition) {
      this.errorMessage = "*Start and End Positions must be different";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
      return;
    }
  
    // Setting transitionId (if not automatically generated by backend)
    this.transitionId = this.transitionData[this.transitionData.length - 1]?.transitionId + 1 || 0;
  
    // Prepare the new transition data with correct field names
    const newTransition = {
      transitionId: this.transitionId,
      name: this.transitionName,
      startPosition: this.startPosition,
      endPosition: this.endPosition,
      createdBy: createdBy,
      createdOn: new Date().toISOString() // Setting current date and time
    };
  
    // Send POST request to backend
    fetch('http://localhost:3000/transitions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newTransition),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Failed to create transition');
        });
      }
      return response.json();
    })
    .then((newTransitionFromServer: any) => {
      // Update local transition data
      this.transitionData = [...this.transitionData, {
        transitionId: newTransitionFromServer.transitionId,
        name: newTransitionFromServer.name,
        startPosition: newTransitionFromServer.startPosition,
        endPosition: newTransitionFromServer.endPosition,
        createdBy: newTransitionFromServer.createdBy,
        createdOn: newTransitionFromServer.createdOn
      }];
  
      // Reset form fields
      this.transitionName = "";
      this.startPosition = "No Position is Selected";
      this.endPosition = "No Position is Selected";
  
      // Close the create popup
      this.createPopupState = false;
    })
    .catch(error => {
      console.error('Error creating transition:', error);
      this.errorMessage = error.message; // Display backend error message
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    });
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


    //deleting the transition
    deleteTransition() {
      const transitionId = this.deleteTransitionID;
  
      fetch(`http://localhost:3000/transitions/${transitionId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message || 'Failed to delete transition');
          });
        }
        return response.json();
      })
      .then(() => {
        this.transitionData = this.transitionData.filter((transition: any) => transition.transitionId !== transitionId);
        this.deletePopup(); // Close the delete popup
      })
      .catch(error => {
        console.error('Error deleting transition:', error);
        this.errorMessage = error.message; // Display backend error message
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      });
    }
    getDeleteTransition(index:number) {
      this.deletePopup()
      this.deleteTransitionID = this.transitionData[index].transitionId

    }
  editPopup() {
    this.editPopupState = !this.editPopupState
  }

  deletePopup() {
    this.deletePopupState = !this.deletePopupState
  }

}