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
  editTransitionId = ""
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
      this.fetchTransitions();
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
    let isValidate = false;
    console.log("Validating Edit Transition");
  
    // Check if editTransitionName is empty
    if (this.editTransitionName === "") {
      this.errorMessage = "*Enter Transition Name";
      console.log("Validation failed: Transition Name is empty");
    }
    // Check if start and end positions are the same
    else if (this.editStartPos === this.editEndPos) {
      this.errorMessage = "*Give Different Points to create";
      console.log("Validation failed: Start and End positions are the same");
    }
    // If validation passes
    else {
      isValidate = true;
    }
  
    // Clear the error message after a delay
    setTimeout(() => {
      this.errorMessage = "";
    }, 4000);
  
    // Call editTransition if validation is successful
    if (isValidate) {
      console.log("Validation successful. Calling editTransition");
      this.editTransition(this.editTransitionId);
      this.editPopup(); // Close the edit popup
    }
  
    // Close the position popups
    this.startPositionPopupOCstate = false;
    this.endPositionPopupOCstate = false;
  }
  
  


  getEditTransition(transitionId: number) {
    console.log("Transition ID:", transitionId);
    const transition = this.transitionData.find((t: any) => t.transitionId === transitionId);
    
    if (transition) {
      console.log("Transition Name:", transition.name);
  
      // Populate the edit fields with transition data
      this.editTransitionId = transition.transitionId;
      this.editTransitionName = transition.name;
      this.editStartPos = transition.startPosition;
      this.editEndPos = transition.endPosition;
  
      // Open the edit popup
      this.editPopup();
    } else {
      console.error("Transition not found with ID:", transitionId);
    }
  }
  
  editTransition(transitionId: string) {
    if (!transitionId) {
      console.error("No transition ID set for editing");
      return;
    }
  
    const updatedTransition = {
      name: this.editTransitionName,
      startPosition: this.editStartPos,
      endPosition: this.editEndPos
    };
  
    console.log("Updating transition with ID:", transitionId);
    console.log("Data to be updated:", updatedTransition);
  
    fetch(`http://localhost:3000/transitions/${transitionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedTransition),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Failed to update transition');
        });
      }
      return response.json();
    })
    .then((updatedTransitionFromServer: any) => {
      const index = this.transitionData.findIndex((transition: any) => transition.transitionId === transitionId);
      if (index !== -1) {
        this.transitionData[index] = {
          ...this.transitionData[index],
          name: updatedTransitionFromServer.name,
          startPosition: updatedTransitionFromServer.startPosition,
          endPosition: updatedTransitionFromServer.endPosition
        };
      }
      this.editTransitionName = "";
      this.editStartPos = "";
      this.editEndPos = "";
      this.editPopupState = false;
    })
    .catch(error => {
      console.error('Error updating transition:', error);
      this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    });
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