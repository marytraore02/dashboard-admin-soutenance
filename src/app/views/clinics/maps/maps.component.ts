import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CliniqueService } from 'src/app/services/clinique.service';

L.Icon.Default.imagePath = 'assets/';
// LeafLet.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'assets/marker-icon-2x.png',
//   iconUrl: 'assets/marker-icon.png',
//   shadowUrl: 'assets/marker-shadow.png'
// });
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  searchText: any;
  p: any;
  cliniques: any;
  totalClinique: any;
  longitude: any;
  latitude: any;

  constructor(
      private cliniqueSevice: CliniqueService
    ){}
    
  map!: L.Map;
  markers: L.Marker[] = [];
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 16,
    center: { lat: 12.63074, lng: -8.0291869 },
  };

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 12.6309774, lng: -8.0298742 },
        draggable: true,
      },
      {
        position: { lat: 12.6370812, lng: -8.0334823 },
        draggable: false,
      },
      {
        position: { lat: 12.6311985, lng: -8.029236 },
        draggable: true,
      },
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return L.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: L.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }

  ngOnInit(): void {
    this.listeClinique()
  }

  listeClinique(): void {
    this.cliniqueSevice.liste().subscribe(
      data => {
        console.log(data);
        this.cliniques = data;
        this.totalClinique = this.cliniques.length
        this.longitude = this.cliniques[2].longitudeClinique
        this.latitude = this.cliniques[2].latitudeClinique
        console.log(this.longitude)
        console.log(this.latitude)
        // this.id = this.cliniques[1].id
      },
      err => {
        console.log(err);
      }
    );
  }



}
