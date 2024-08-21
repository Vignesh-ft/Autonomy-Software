import { Component } from '@angular/core';

@Component({
  selector: 'app-system-log',
  templateUrl: './system-log.component.html',
  styleUrl: './system-log.component.css'
})
export class SystemLogComponent {
  systemLogData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.fetchSystemLogs();
  }

  fetchSystemLogs(): void {
    fetch('http://localhost:3000/systemlogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.systemLogData = data;
      })
      .catch(error => {
        console.error('Error fetching system logs:', error);
      });
  }
}
