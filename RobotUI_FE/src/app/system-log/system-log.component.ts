import { Component } from '@angular/core';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrl: './system-log.component.css'
})
export class SystemLogComponent {
  systemLogData = [
    {
      state: 'completed',
      moduleName: 'Camera_floor_nodelet_manager',
      message: 'No device Connected.... Looking for the device to be Connected',
      time: 'HH:MM:SS'
    },
    {
      state: 'partially',
      moduleName: 'Camera_floor_nodelet_manager',
      message: 'No device Connected.... Looking for the device to be Connected',
      time: 'HH:MM:SS'
    },
    {
      state: 'completed',
      moduleName: 'Camera_floor_nodelet_manager',
      message: 'No device Connected.... Looking for the device to be Connected',
      time: 'HH:MM:SS'
    },
    {
      state: 'break',
      moduleName: 'Camera_floor_nodelet_manager',
      message: 'No device Connected.... Looking for the device to be Connected',
      time: 'HH:MM:SS'
    },
    {
      state: 'partially',
      moduleName: 'Camera_floor_nodelet_manager',
      message: 'No device Connected.... Looking for the device to be Connected',
      time: 'HH:MM:SS'
    },
  ]
}
