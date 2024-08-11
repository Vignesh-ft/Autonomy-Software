import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
  missionData: any[] = [];
  dropDownOptions: DropDownOption[] = [];
  defaultSite = '';
  selectedMap: DropDownOption | null = null;

  ngOnInit(): void {
    this.fetchMaps(); // Fetch map names when the component initializes
   // this.fetchMissions();
  }

  //fetching the map name from the map's collection
  fetchMaps() {
    fetch('http://localhost:3000/maps')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.dropDownOptions = data.map((map: any, index: number) => ({
          ddOrder: index,
          title: map.name,
          site: map.site,
          location: map.location,
        }));
        if (this.dropDownOptions.length > 0) {
          this.defaultSite = this.dropDownOptions[0].title;
          this.selectedMap = this.dropDownOptions[0];
        }
      })
      .catch(error => {
        console.error('Error fetching maps:', error.message);
        this.errorMessage = 'Failed to load maps data';
      });
  }

  
  
  
  
  
  createPopup() {
    this.createMissionPopupState = !this.createMissionPopupState
  }

  createPopupDD() {
    this.createMissionDropDown = !this.createMissionDropDown
  }


  changeSiteName(order:any){
    this.defaultSite = this.dropDownOptions[order].title
    this.createPopupDD()
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
        createdOn: new Date().toISOString(),
      };
  
      // Post the new mission to the backend API
      fetch('http://localhost:3000/mission', {
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
          console.log('Mission created successfully:', data);
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
  

  missionQueuePopup() {
    this.missionQueueState = !this.missionQueueState
  }

  deletePopup() {
    this.deleteMissionPopupState = !this.deleteMissionPopupState
  }



}
