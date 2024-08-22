import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common"

interface Config {
  id: string; // Assuming id is a number, change as per your actual data type
  order: number;
  name: string;
  position: any; 
  retries: any;
  distanceThreshold: any;
}



@Component({
  selector: 'app-create-missions',
  templateUrl: './create-missions.component.html',
  styleUrl: './create-missions.component.css'
})


export class CreateMissionsComponent {
  idParam:any
  nameParam:any
  moveOptionsState = false
  position:any = ""
  retries:any = ""
  distanceThreshold:any = ""
  configuration:Array<Config>  =[]
  addMovOptionsPopup = false
  errorMessage = ""
  MovNameVariable = ""
  deleteAllPopupState = false
  editMovOptionsState = false
  editOrder:any
  editPosition:any
  editRetries:any
  editDistanceThreshold:any

  constructor(private route: ActivatedRoute, private router:Router, private location:Location) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idParam = params['id'];
      this.nameParam = params['name'];

      console.log(this.idParam, this.nameParam);
    });

    this.fetchDetails(this.idParam, this.nameParam);
  }

  fetchDetails(id: any, name:any){
    console.log([id,name])  //Do your API req and Store response in an variable
  }


  mainOptions = [
    {
      nameTag: "Move",
      option: "move",
      icon: '<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9987 12.8335H15.1654V7.00016H18.6654L13.9987 2.3335L9.33203 7.00016H12.832V12.8335H6.9987V9.3335L2.33203 14.0002L6.9987 18.6668V15.1668H12.832V21.0002H9.33203L13.9987 25.6668L18.6654 21.0002H15.1654V15.1668H20.9987V18.6668L25.6654 14.0002L20.9987 9.3335V12.8335Z" fill="#D30000"/></svg>',
      callFunc : this.moveOption.bind(this)
    },
    {
      nameTag: "Battery",
      option: "battery",
      icon: '<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 5.25V7H10.5V5.25H7ZM17.5 5.25V7H21V5.25H17.5ZM3.5 7.875V23.625H24.5V7.875H3.5ZM5.25 9.625H22.75V21.875H5.25V9.625ZM17.5 13.125V14.875H15.75V16.625H17.5V18.375H19.25V16.625H21V14.875H19.25V13.125H17.5ZM7 14.875V16.625H12.25V14.875H7Z" fill="#D30000"/></svg>',
      callFunc : ""
    },
    {
      nameTag: "Logic",
      option: "logic",
      icon: '<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1643_27971)"><path d="M25.6654 14H19.832" stroke="#D30000" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.33203 10.5H8.16536" stroke="#D30000" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.33203 17.5H8.16536" stroke="#D30000" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.16797 5.8335L19.8346 14.0002L8.16797 22.1668V5.8335Z" stroke="#D30000" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1643_27971"><rect width="28" height="28" fill="white"/></clipPath></defs></svg>',
      callFunc : ""
    },
    {
      nameTag: "Error Handling",
      option: "error-handling",
      icon: '<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8332 11.6665H15.1665V17.4998H12.8332V11.6665ZM12.832 18.6665H15.1654V20.9998H12.832V18.6665Z" fill="#D30000"/><path d="M16.0618 4.90013C15.6558 4.13597 14.8648 3.66113 13.9991 3.66113C13.1335 3.66113 12.3425 4.13597 11.9365 4.9013L3.37546 21.0748C3.18549 21.43 3.09139 21.8285 3.10243 22.2312C3.11348 22.6338 3.2293 23.0266 3.43846 23.3708C3.64461 23.7166 3.93737 24.0026 4.28785 24.2007C4.63833 24.3987 5.0344 24.5019 5.43696 24.5001H22.5613C23.3873 24.5001 24.1351 24.0778 24.561 23.3708C24.7698 23.0265 24.8854 22.6337 24.8965 22.2311C24.9075 21.8286 24.8136 21.4301 24.624 21.0748L16.0618 4.90013ZM5.43696 22.1668L13.9991 5.9933L22.5671 22.1668H5.43696Z" fill="#D30000"/></svg>',
      callFunc : ""
    },
    {
      nameTag: "Light / Sound",
      option: "light&sound",
      icon: '<svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1643_33311)"><path d="M3.50001 10.4998C3.49995 8.76597 3.92928 7.05906 4.74965 5.53153C5.57001 4.00401 6.75589 2.70342 8.20139 1.74588C9.64689 0.78835 11.307 0.203683 13.0335 0.0440884C14.7601 -0.115506 16.4992 0.154938 18.0958 0.831274C19.6923 1.50761 21.0965 2.56879 22.183 3.92005C23.2694 5.27131 24.0044 6.87059 24.3221 8.5751C24.6399 10.2796 24.5307 12.0363 24.0041 13.6883C23.4775 15.3403 22.5501 16.8361 21.3045 18.0423C20.9493 18.3853 20.6763 18.7423 20.5118 19.1256L19.1783 22.2213C19.1106 22.3782 18.9985 22.5119 18.8557 22.6058C18.713 22.6997 18.5459 22.7498 18.375 22.7498C18.6071 22.7498 18.8296 22.842 18.9937 23.0061C19.1578 23.1702 19.25 23.3928 19.25 23.6248C19.25 23.8569 19.1578 24.0795 18.9937 24.2436C18.8296 24.4077 18.6071 24.4998 18.375 24.4998C18.6071 24.4998 18.8296 24.592 18.9937 24.7561C19.1578 24.9202 19.25 25.1428 19.25 25.3748C19.25 25.6069 19.1578 25.8295 18.9937 25.9936C18.8296 26.1577 18.6071 26.2498 18.375 26.2498L17.983 27.0321C17.8378 27.3227 17.6145 27.5672 17.3382 27.7381C17.0619 27.909 16.7434 27.9997 16.4185 27.9998H11.5815C11.2566 27.9997 10.9382 27.909 10.6618 27.7381C10.3855 27.5672 10.1622 27.3227 10.017 27.0321L9.62501 26.2498C9.39294 26.2498 9.17038 26.1577 9.00629 25.9936C8.84219 25.8295 8.75001 25.6069 8.75001 25.3748C8.75001 25.1428 8.84219 24.9202 9.00629 24.7561C9.17038 24.592 9.39294 24.4998 9.62501 24.4998C9.39294 24.4998 9.17038 24.4077 9.00629 24.2436C8.84219 24.0795 8.75001 23.8569 8.75001 23.6248C8.75001 23.3928 8.84219 23.1702 9.00629 23.0061C9.17038 22.842 9.39294 22.7498 9.62501 22.7498C9.45384 22.7501 9.28635 22.7002 9.14326 22.6063C9.00018 22.5124 8.88779 22.3785 8.82001 22.2213L7.48826 19.1238C7.29757 18.7148 7.0282 18.3473 6.69551 18.0423C5.68335 17.0644 4.87871 15.8924 4.32967 14.5965C3.78063 13.3006 3.49846 11.9073 3.50001 10.4998ZM14 1.74984C12.2573 1.74955 10.5542 2.26965 9.10896 3.24349C7.66373 4.21733 6.54222 5.60055 5.88816 7.21586C5.2341 8.83118 5.07728 10.605 5.43781 12.31C5.79834 14.015 6.65979 15.5736 7.91176 16.7858C8.37201 17.2303 8.81126 17.7728 9.09476 18.4326L10.2025 20.9998H17.801L18.907 18.4326C19.1905 17.7728 19.6298 17.2303 20.09 16.7858C21.3421 15.5735 22.2036 14.0148 22.564 12.3096C22.9245 10.6044 22.7676 8.83045 22.1133 7.21505C21.459 5.59966 20.3372 4.21646 18.8917 3.24276C17.4462 2.26905 15.7429 1.7492 14 1.74984Z" fill="#D30000"/><path d="M19.3383 13.6936L17.8328 12.8194C17.8081 12.8052 17.7808 12.796 17.7525 12.7923C17.7243 12.7887 17.6956 12.7907 17.668 12.7982C17.6405 12.8057 17.6148 12.8186 17.5922 12.8361C17.5697 12.8537 17.5508 12.8755 17.5366 12.9004L17.265 13.3739C17.205 13.4782 17.2404 13.6127 17.3442 13.6731L18.8497 14.5473C18.8744 14.5616 18.9017 14.5708 18.93 14.5744C18.9583 14.578 18.987 14.576 19.0145 14.5685C19.042 14.561 19.0677 14.5481 19.0903 14.5306C19.1128 14.513 19.1317 14.4912 19.1459 14.4663L19.4175 13.9928C19.4776 13.8885 19.4407 13.754 19.3383 13.6936ZM17.5353 8.28892C17.5494 8.31379 17.5683 8.33562 17.5909 8.35315C17.6134 8.37068 17.6392 8.38358 17.6667 8.39109C17.6942 8.39861 17.7229 8.40061 17.7512 8.39697C17.7794 8.39334 17.8067 8.38413 17.8315 8.36989L19.337 7.49564C19.4407 7.43525 19.4762 7.30075 19.4161 7.19644L19.1459 6.72432C19.1317 6.69945 19.1128 6.67762 19.0903 6.66009C19.0677 6.64256 19.042 6.62966 19.0145 6.62214C18.987 6.61462 18.9583 6.61263 18.93 6.61626C18.9017 6.6199 18.8744 6.6291 18.8497 6.64334L17.3442 7.5176C17.2943 7.54682 17.258 7.5947 17.2432 7.65077C17.2283 7.70684 17.2362 7.76653 17.265 7.81679L17.5353 8.28892ZM19.9102 10.1006H18.1631C18.043 10.1006 17.9447 10.1994 17.9447 10.3202V10.8691C17.9447 10.9899 18.043 11.0887 18.1631 11.0887H19.9102C20.0304 11.0887 20.1286 10.9899 20.1286 10.8691V10.3202C20.1286 10.1994 20.0304 10.1006 19.9102 10.1006ZM15.7049 5.146C15.6244 5.146 15.5425 5.16796 15.4674 5.21874L10.6287 8.39872H8.39026C8.27015 8.39872 8.17188 8.49753 8.17188 8.61831V12.571C8.17188 12.6918 8.27015 12.7906 8.39026 12.7906H10.6287L15.4674 15.9706C15.5425 16.02 15.6257 16.0433 15.7049 16.0433C15.9328 16.0433 16.143 15.8608 16.143 15.6027V5.58655C16.143 5.32853 15.9328 5.146 15.7049 5.146Z" fill="#D30000"/></g><defs><clipPath id="clip0_1643_33311"><rect width="28" height="28" fill="white"/></clipPath></defs></svg>',
      callFunc : ""
    }
  ]

  functionCall(arr:any) {
    arr.callFunc()
  }

  goBack() {
    this.location.back()
  }

  moveOption() {
    this.moveOptionsState = !this.moveOptionsState
  }

  getConfig(name:any){
    this.addMovPopup()
    this.MovNameVariable = name
    this.moveOptionsState = false
  }

  addMovPopup(){
    this.addMovOptionsPopup = !this.addMovOptionsPopup
    this.position = ""
    this.retries = ""
    this.distanceThreshold = ""
  }

  timingFunction() {
    setTimeout(()=> {
      this.errorMessage = ""
    },1400)
  }

  getCurrentActionID(order:any) {
    this.editOrder = order
    this.editMovOptionsState = !this.editMovOptionsState
    let currentActionDetails = this.configuration.find((config)=> config.order === order)
    this.editPosition = currentActionDetails?.position
    this.editRetries = currentActionDetails?.retries
    this.editDistanceThreshold = currentActionDetails?.distanceThreshold
  }

  validateAndCloseMov(order: any, name: any, position: any, retries: any, distanceThreshold: any) {
    if (position === "" && retries === "" && distanceThreshold === "") {
      this.errorMessage = "Enter all the values";
      this.timingFunction();
      return;
    }
  
    if (position === "") {
      this.errorMessage = "Position is Not Entered";
      this.timingFunction();
      return;
    }
  
    if (retries === "") {
      this.errorMessage = "Retries are not Entered";
      this.timingFunction();
      return;
    }
  
    if (distanceThreshold === "") {
      this.errorMessage = "Distance Threshold is not Entered";
      this.timingFunction();
      return;
    }
  
    // Ensure edit values are updated
    this.editPosition = position;
    this.editRetries = retries;
    this.editDistanceThreshold = distanceThreshold;
  
    // Create the updated mission object
    const updatedMission = {
      id: this.idParam, // Assuming `idParam` is the id of the mission being updated
      order: order, // Keep the same order
      name: name, // Keep the same name
      position: this.editPosition,
      retries: this.editRetries,
      distanceThreshold: this.editDistanceThreshold
    };
  
    console.log("Data:", updatedMission);
  
    // Perform the update operation
    fetch(`http://localhost:3000/mission/missions/${this.idParam}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMission)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Update successful", data);
      this.editMovOptionsState = false;
      this.timingFunction(); // Clear the message after some time
  
      // Update the local configuration array
      const index = this.configuration.findIndex(config => config.id === this.idParam);
      if (index !== -1) {
        this.configuration[index] = updatedMission; // Update the existing entry
      } else {
        this.configuration.push(updatedMission); // Add it if not found (safety check)
      }
      
      this.moveOptionsState = false;
      this.addMovPopup();
    })
    .catch(error => {
      console.error("Error updating configuration:", error);
      this.errorMessage = "Error updating configuration. Please try again.";
      this.timingFunction(); // Clear the message after some time
    });
  }
  

  deleteAll() {
      this.configuration = []
      this.deleteAllPopup()
  }

  closeEdit(order:any){
    this.moveOptionsState = false
  }

  closePopup() {
    this.addMovPopup()
  }

  deleteAllPopup() {
    this.deleteAllPopupState = !this.deleteAllPopupState
  }

  removeAction(order:any) {
    this.configuration = this.configuration.filter((config)=> config.order !== order)
    this.editMovOptionsState = !this.editMovOptionsState
  }

  moveOptions = [
    {
      nameTag: "Adjsut / Localisation",
      func: ":"
    },
    {
      nameTag: "Check Position Status",
      func: ":"
    },
    {
      nameTag: "Docking",
      func: ":"
    },
    {
      nameTag: "Move",
      func: ":"
    },
    {
      nameTag: "Move to Coordinate",
      func: ":"
    },
    {
      nameTag: "Plannar Settings",
      func: ":"
    },
    {
      nameTag: "Relative Mode",
      func: ":"
    },
    {
      nameTag: "Set Footprint",
      func: ":"
    },

  ]


}
