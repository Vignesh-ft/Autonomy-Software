import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css',
  providers: [CookieService]
})
export class MapsComponent implements OnInit  {
  createMapsPopUpState = false;
  deletePopupState = false
  mapsName = "";
  siteMapDDstate = false;
  color = 'white'
  errorMessage = ""
  mapsId = -1

  deleteMapId = ""

  constructor(private router:Router, private cookieService: CookieService ){}

  navigateMap(id: any,name: any) {
    this.router.navigate(['/app/setup/maps/create-map'],{queryParams: {id: id, name: name}})
  }

  ngOnInit(): void {
    this.fetchMaps(); // Load maps data on initialization
  }

  siteName = [
    {
      order: 0,
      nameTag: "Unit-1"
    },
    {
      order: 1,
      nameTag: "Unit-2"
    },
    {
      order: 2,
      nameTag: "Unit-3"
    },
    {
      order: 3,
      nameTag: "Unit-4"
    },
    {
      order: 4,
      nameTag: "Unit-5"
    },
  ]

  mapsData:any =[

  ]

  mapId = 0


  defaultSite = this.siteName[0].nameTag

  createMapsPopUpOC() {
    this.createMapsPopUpState = !this.createMapsPopUpState
    this.errorMessage = ""
    this.mapsName = ""
    this.defaultSite = this.siteName[0].nameTag
  }

  changeSiteName(order:number){
    this.defaultSite = this.siteName[order].nameTag
  }

  fetchMaps(): void {
    fetch('http://localhost:3000/maps')
      .then(response => response.json())
      .then((maps: any[]) => {
        this.mapsData = maps.map(map => {
          const dateString = map.createdAt;
          console.log("Original Date from DB:", dateString);

          // // Parse the ISO date string into a Date object
          // const date = new Date(dateString);

          const [datePart, timePart] = dateString.split(' ');

          // Split the date part into day, month, and year
          const [day, month, year] = datePart.split(':').map(Number);

          // Split the time part into hours and minutes
          const [hours, minutes] = timePart.split(':').map(Number);

          // Construct a new Date object
          const date = new Date(Date.UTC(year, month - 1, day, hours, minutes));

          // Format the date
          const formattedDay = String(date.getUTCDate()).padStart(2, '0');
          const formattedMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
          const formattedYear = date.getUTCFullYear();
          const formattedHours = String(date.getUTCHours()).padStart(2, '0');
          const formattedMinutes = String(date.getUTCMinutes()).padStart(2, '0');
          const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear} ${formattedHours}:${formattedMinutes}`; // change the format if you want

          console.log("Formatted Date:", formattedDate);

          return {
            mapId: map._id, // MongoDB _id field
            mapName: map.name,
            site: map.site,
            createdBy: map.createdBy,
            createdAt: formattedDate // Format createdAt date
          };
        });
        console.log('Fetched maps:', this.mapsData);
      })
      .catch(error => {
        console.error('Error fetching maps:', error);
      });
  }

  createMaps() {
    if (this.mapsName) {
      // Fetch username from cookies
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

      // Prepare the map data
      let mapData = {
        name: this.mapsName,
        site: this.defaultSite,
        createdBy: user, // Replace with actual user if applicable
        createdAt: new Date().toISOString() // Or use any other date format
      };

      // Send POST request to backend
      fetch('http://localhost:3000/maps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapData),
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message || 'Failed to create map');
          });
        }
        return response.json();
      })
      .then((newMap: any) => {
        // Update local state with the new map
        this.mapsData = [...this.mapsData, {
          mapId: newMap._id, // MongoDB _id field
          mapName: newMap.name,
          site: newMap.site,
          createdBy: newMap.createdBy,
          createdAt: newMap.createdAt
        }];
        // Reset form fields
        this.mapsName = "";
        this.defaultSite = this.siteName[0].nameTag;
        this.createMapsPopUpOC(); // Close the popup
      })
      .catch(error => {
        console.error('Error creating map:', error);
        this.errorMessage = error.message; // Display the backend error message
        setTimeout(() => {
          this.errorMessage = "";
        }, 5000);
      });
    } else {
      this.errorMessage = "*Map name is Required";
      setTimeout(() => {
        this.errorMessage = "";
      }, 5000);
    }
  }

  siteMapOC() {
    this.siteMapDDstate = !this.siteMapDDstate
  }

  deleteMaps(mapId: string) {
    fetch(`http://localhost:3000/maps/${mapId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          this.mapsData = this.mapsData.filter((map: any) => map.mapId !== mapId);
        } else {
          console.error('Error deleting map:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting map:', error);
      });
      this.deleteMapId = ""
      this.deletePopUpOpens()
  }

  deletePopUpOpens() {
    this.deletePopupState = !this.deletePopupState
  }

  getDeleteId(mapId: string){
    this.deleteMapId = mapId
    this.deletePopUpOpens()
  }

}
