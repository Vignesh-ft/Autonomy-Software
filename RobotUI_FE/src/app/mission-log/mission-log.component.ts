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
      missionname: "MissionName 1",
      state: "completed",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name"
    },
    {
      missionname: "MissionName 2",
      state: "partially",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name"
    },
    {
      missionname: "MissionName 3",
      state: "partially",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name"
    },
    {
      missionname: "MissionName 4",
      state: "break",
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, tempore expedita? Enim, blanditiis saepe, amet totam adipisci, iste exercitationem ad sunt minima aspernatur neque repudiandae. Accusantium quam corrupti saepe quia.",
      startTime: "00:00 DD/MM/YYYY",
      ranFor: "00:50:59",
      startedBy: "User name"
    }
    ]

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
