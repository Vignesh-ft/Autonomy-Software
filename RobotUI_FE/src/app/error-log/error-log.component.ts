import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {
  errorLogData: any[] = [];
  deleteErrorLogId: any;
  errorPopupState = false;
  deleteAllState = false;

  private apiUrl = `http://${environment.API_URL}:${environment.PORT}/errorlogs`;

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then((logs: any[]) => {
        this.errorLogData = logs.map(log => {

          return {
            errorId: log._id, // MongoDB `_id` field
            moduleName: log.moduleName, 
            description: log.description,// Assuming the module name field is `moduleName`
            time: log.time
          };
        });
      })
      .catch(error => {
        console.error('Error fetching error logs:', error);
      });
      
  }

  getDeleteErrorId(errorId: string) {
    this.deleteErrorLogId = errorId;
    this.errorPopup();
    console.log("Error Log ID:", this.deleteErrorLogId); // Print the error log ID
  }

  deleteErrorLog(id: any): void {
    fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Delete Response:', data); // Verify the delete response
        this.errorLogData = this.errorLogData.filter(log => log.errorId !== id);
        this.errorPopup();
      })
      .catch(error => {
        console.error('Error deleting error log:', error);
      });
  }

  errorPopup() {
    this.errorPopupState = !this.errorPopupState;
  }

  deleteAllPopup() {
    this.deleteAllState = !this.deleteAllState;
  }

  errorLogDownload(order: any) {
    console.log("Your File is Downloading");
    setTimeout(() => {
      console.log("Downloaded Just text for testing");
    }, 4000);
  }

  // Method to delete all error logs
  deleteAll(): void {
    fetch(this.apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete logs');
        }
        return response.json();
      })
      .then(data => {
        console.log('All logs deleted:', data); // Confirm the deletion
        this.errorLogData = []; // Clear the logs from the frontend
        this.deleteAllPopup();  // Close the popup
      })
      .catch(error => {
        console.error('Error deleting all logs:', error);
      });
  }
}
