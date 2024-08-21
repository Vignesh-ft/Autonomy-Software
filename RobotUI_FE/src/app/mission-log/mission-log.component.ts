import { booleanAttribute, Component } from '@angular/core';
import { environment } from '../../environments/environment.development';

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

  private apiUrl = `http://${environment.API_URL}:${environment.PORT}/missionlogs`;

  ngOnInit(): void {
    this.fetchMissionLogs();
  }

  missionActionPopup() {
    this.missionActionState = !this.missionActionState
  }

  fetchMissionLogs(): void {
    fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Data:', data); // Log the data to verify the structure
        this.missionLogData = data;
      })
      .catch(error => {
        console.error('Error fetching mission logs:', error);
      });
  }
  
  viewLogs(missionId: string) {
    this.selectedUserLog = this.missionLogData.find((mission) => mission._id === missionId)?.logs || [];
    this.missionActionPopup();
  }

}
