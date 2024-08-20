import { booleanAttribute, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mission-log',
  templateUrl: './mission-log.component.html',
  styleUrl: './mission-log.component.css'
})
export class MissionLogComponent {
  missionLogData: any[] = [];
  selectedUser:any
  missionActionState = false
  selectedUserLog: any;
  userName: string = '';

  private apiUrl = 'http://localhost:3000/missionlogs';

  ngOnInit() {
    this.fetchMissionLogs();
  }

  missionActionPopup() {
    this.missionActionState = !this.missionActionState
  }

  async fetchMissionLogs() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched Data:', data); // Log the data to verify the structure
      this.missionLogData = data;
    } catch (error) {
      console.error('Error fetching mission logs:', error);
    }
  }
  viewLogs(missionId: string) {
    this.selectedUserLog = this.missionLogData.find((mission) => mission._id === missionId)?.logs || [];
    this.missionActionPopup();
  }

}
