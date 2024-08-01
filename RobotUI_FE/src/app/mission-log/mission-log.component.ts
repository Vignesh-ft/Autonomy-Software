import { booleanAttribute, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mission-log',
  templateUrl: './mission-log.component.html',
  styleUrl: './mission-log.component.css'
})
export class MissionLogComponent {
  missionLogData = [
    {
      missionOrder: 0,
      missionname: "MissionName Start",
      state: "completed",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name",
      logs: [
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },

      ]
    },
    {
      missionOrder: 1,
      missionname: "MissionName 2",
      state: "partially",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name",
      logs: [
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },

      ]
    },
    {
      missionOrder: 2,
      missionname: "MissionName 3",
      state: "partially",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name",
      logs: [
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },

      ]
    },
    {
      missionOrder: 3,
      missionname: "MissionName 4",
      state: "break",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name",
      logs: [
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },
        {
          action: 'move',
          state: 'completed',
          message: "Position A reached point 1",
          startTime: "00:00 DD/MM/YYYY",
          ranFor: "00:01:15"
        },

      ]
    },

  ]

  selectedUser:any
  missionActionState = false
  selectedUserLog: any;

  missionActionPopup() {
    this.missionActionState = !this.missionActionState
  }

  // Note: I have created this to get the username so while integurating the backend use id to get the name
  getUserName(missionOrder: any) {
    this.selectedUser = this.missionLogData.find((mission) => {
      return mission.missionOrder === missionOrder
    });
    this.missionActionPopup()

    this.selectedUserLog = this.selectedUser.logs;
    console.log(this.selectedUserLog)
  }


  // Schema

  // {
  //   missionname: "MissionName",
  //   state: completed | partially | break,
  //   message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
  //   startTime: "00:00 DD/MM/YYYY",
  //   ranFor: "00:50:59",
  //   startedBy: "User name"
  // }
}
