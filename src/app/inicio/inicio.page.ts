import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  nombreUsuario: string = '';
  scanResult: string = '';  
  isScanning: boolean = false;  
  formats = [BarcodeFormat.QR_CODE];  
  qrCodeData: string = ''; 

  constructor() {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
    console.log('Nombre de usuario en Inicio:', this.nombreUsuario);
  }
        onScanSuccess(result: string) {
          console.log('Resultado escaneado:', result);
          if (result) {
            this.scanResult = result;  
            this.isScanning = false;
            console.log('Texto escaneado:', this.scanResult);
            let urlToOpen = this.scanResult;


        if (!urlToOpen.startsWith('http://') && !urlToOpen.startsWith('https://')) {
          urlToOpen = 'https://' + urlToOpen;
        }
      if (this.isValidUrl(urlToOpen)) {
        window.open(urlToOpen, '_system');
      } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(this.scanResult)}`, '_system');
      }
    }
  }

  isValidUrl(url: string): boolean {
    const pattern = new RegExp('^(https?://)?(www\.)?([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$');
    return pattern.test(url);
  }


  copyToClipboard() {
    if (this.scanResult) {
      navigator.clipboard.writeText(this.scanResult).then(() => {
        alert('Texto copiado al portapapeles');
      }).catch((error) => {
        console.error('Error al copiar al portapapeles: ', error);
      });
    }
  }


      startScanning() {
        this.isScanning = true;
        console.log('Escáner iniciado');
      }

 

  
  }

