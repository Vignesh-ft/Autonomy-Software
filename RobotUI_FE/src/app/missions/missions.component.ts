import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
import { isValidDate } from 'rxjs/internal/util/isDate';

interface DropDownOption {
  ddOrder: number;
  title: string;
  site: string;
  location: string;
}

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
  deleteMissionQueuePopupState  = false
  missionData: any[] = [];
  dropDownOptions: DropDownOption[  ] = [];
  defaultSite = 'Select a Map';
  selectedMap: DropDownOption | null = null;
  deleteMissionID = ""
  editMissionPopupState = false
  editMissionCred:any
  editMissionId = ""
  editMissionName = ""
  editMissionSite = ""
  editMapName = ""

  missionQueueData = [
    {
      queueOrder: 0,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'partially'
    },
    {
      queueOrder: 1,
      missionName: 'Pickup the tray',
      robotType: 'AMR',
      state: 'partially'
    },
    {
      queueOrder: 2,
      missionName: 'Docking',
      robotType: 'ASRS',
      state: 'completed'
    },
    {
      queueOrder: 3,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'completed'
    },
    {
      queueOrder: 4,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'break'
    },
    {
      queueOrder: 0,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'partially'
    },
    {
      queueOrder: 1,
      missionName: 'Pickup the tray',
      robotType: 'AMR',
      state: 'partially'
    },
    {
      queueOrder: 2,
      missionName: 'Docking',
      robotType: 'ASRS',
      state: 'completed'
    },
    {
      queueOrder: 3,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'completed'
    },
    {
      queueOrder: 4,
      missionName: 'Pickup the Container',
      robotType: 'AMR',
      state: 'break'
    },
  ]

  ngOnInit(): void {
    this.fetchMaps(); // Fetch map names when the component initializes
    this.fetchMissions();
  }

  fetchMaps() {
    fetch(`http://${environment.API_URL}:${environment.PORT}/maps`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.dropDownOptions = data.map((map: any, index: number) => ({
          ddOrder: index,
          title: map.name, // Ensure this is the map name
          site: map.site,
          location: map.location,
        }));
      })
      .catch(error => {
        console.error('Error fetching maps:', error.message);
        this.errorMessage = 'Failed to load maps data';
      });
  }


  //fetching the missions to show in the table
  fetchMissions(): void {
    fetch(`http://${environment.API_URL}:${environment.PORT}/mission`)
      .then(response => response.json())
      .then((missions: any[]) => {
        this.missionData = missions.map(mission => {
          const dateString = mission.createdOn;

          // Convert the ISO date string to a Date object
          const date = new Date(dateString);

          // Extract date and time components
          const formattedDay = String(date.getDate()).padStart(2, '0');
          const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
          const formattedYear = date.getFullYear();

          const formattedHours = String(date.getHours()).padStart(2, '0');
          const formattedMinutes = String(date.getMinutes()).padStart(2, '0');

          // Format the date and time as DD/MM/YYYY HH:mm:ss
          const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}`;

          return {
            missionId: mission._id, // MongoDB `_id` field
            missionName: mission.missionName,
            mapName: mission.mapName,
            site: mission.site,
            location: mission.location,
            createdBy: mission.createdBy,
            createdOn: formattedDate // Use the formatted IST date
          };
        });
      })
      .catch(error => {
        console.error('Error fetching missions:', error);
      });
  }
//creating the new mission
createMission() {
  if (this.missionName === "") {
    this.errorMessage = "Enter the Mission name";
    setTimeout(() => {
      this.errorMessage = "";
    }, 4000);
    return;
  }
  const cookieValue = this.cookieService.get("_user");
  let user = "Unknown"; // Default to "Unknown" if cookie is not found

    try {
      if (cookieValue) {
        const parsedCookie = JSON.parse(cookieValue);
        user = parsedCookie.name || "Unknown"; // Use `name` for username
      }
    } catch (e) {
      console.error('Error parsing cookie:', e);
    }

  if (this.selectedMap) {
    this.misisonId = this.missionData.length > 0 ? this.missionData[this.missionData.length - 1].missionId + 1 : 1;

    const newMission = {
      missionId: this.misisonId,
      missionName: this.missionName,
      mapName: this.selectedMap.title,
      site: this.selectedMap.site,
      location: "urapakkam",
      createdBy: user,
      createdOn: new Date().toISOString()
    };

    // Post the new mission to the backend API
    fetch(`http://${environment.API_URL}:${environment.PORT}/mission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMission),
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        console.log('Mission created successfully:');
        this.fetchMissions();
        // Add the new mission to the missionData array
        this.missionData = [...this.missionData, newMission];
        this.createPopup();
        // Reset form fields after mission creation
        this.missionName = '';
        this.defaultSite = '';
        this.selectedMap = null;
      })
      .catch(error => {
        console.error('Error creating mission:', error.message);
        this.errorMessage = 'Failed to create mission';
      });

  }
}

//deleting the particular mission
deleteMissions( missionId: string ) {
  fetch(`http://${environment.API_URL}:${environment.PORT}/mission/${missionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    if (response.ok) {
      this.missionData = this.missionData.filter((mission: any) => mission.missionId !== missionId);
    } else {
      console.error('Error deleting map:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error deleting map:', error);
  });
  this.deleteMissionID = ""
  this.deletePopup()
}

editMission() {
  if (this.editMissionName === "") {
    this.errorMessage = "*Enter the Mission name!";
    return;
  }

  this.updateMissions(this.editMissionId);
  this.editMissionPopup();
}

getEditMissionId(missionId: string) {
  const mission = this.missionData.find((m: any) => m.missionId === missionId);

  if (mission) {
    this.editMissionId = mission.missionId;
    this.editMissionName = mission.missionName;

    // Find the map from the dropdown options using mapName
    const selectedMap = this.dropDownOptions.find((map: any) => map.title === mission.mapName);
    this.editMapName = selectedMap ? selectedMap.title : ''; // Correctly set the map name

    this.editMissionSite = mission.site; // Ensure site is correctly set

    // Open the edit popup with the populated data
    this.editMissionPopup();

    console.log("Map Name:", this.editMapName);
    console.log("Site:", this.editMissionSite);
  } else {
    console.error("Mission not found with ID:", missionId);
  }
}


updateMissions(missionId: string) {
  if (!missionId) {
    console.error("No mission ID set for editing");
    return;
  }

  // Find the map based on the selected map name to get the correct site
  const selectedMap = this.dropDownOptions.find(map => map.title === this.editMapName);

  if (!selectedMap) {
    console.error("Selected map not found in the dropdown options");
    this.errorMessage = "Selected map is invalid";
    return;
  }

  const updatedMission = {
    missionName: this.editMissionName,
    mapName: selectedMap.title, // Ensure this is correctly set
    site: selectedMap.site // Update the site based on the selected map
  };

  fetch(`http://${environment.API_URL}:${environment.PORT}/mission/${missionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(updatedMission),
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.message || 'Failed to update mission');
        });
      }
      return response.json();
    })
    .then((updatedMissionFromServer: any) => {
      const index = this.missionData.findIndex((mission: any) => mission.missionId === missionId);
      if (index !== -1) {
        this.missionData[index] = {
          ...this.missionData[index],
          missionName: updatedMissionFromServer.missionName,
          mapName: updatedMissionFromServer.mapName,
          site: updatedMissionFromServer.site
        };
      }
      console.log("Update successful, closing popup...");
      this.createPopupDD(); // Ensure this correctly closes the popup
    })
    .catch(error => {
      console.error('Error updating mission:', error);
      this.errorMessage = error.message;
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    });
}




  createPopup() {
    this.createMissionPopupState = !this.createMissionPopupState
  }

  createPopupDD() {
    this.createMissionDropDown = !this.createMissionDropDown
  }


  changeSiteName(order: any) {
    this.defaultSite = this.dropDownOptions[order].title;
    this.selectedMap = this.dropDownOptions[order]; // Update selected map
    this.createPopupDD();
  }

  changeEditSiteName(order: any) {
    this.editMissionSite = this.dropDownOptions[order].title;
    this.editMapName = this.dropDownOptions[order].title; // Update map name
    this.createPopupDD();
  }


  missionQueuePopup() {
    this.missionQueueState = !this.missionQueueState
  }

  deleteMissionQueuePopup() {
    this.deleteMissionQueuePopupState = !this.deleteMissionQueuePopupState

  }

  deletePopup() {
    this.deleteMissionPopupState = !this.deleteMissionPopupState
  }

  getMissionId(missionId: string)
  {
    this.deleteMissionID = missionId
    this.deletePopup()
    console.log("Id: ", missionId);
  }


  editMissionPopup() {
    this.editMissionPopupState = !this.editMissionPopupState
    this.createMissionDropDown = false
    
  }



}
