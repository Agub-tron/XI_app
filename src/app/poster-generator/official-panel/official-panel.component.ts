import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-official-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './official-panel.component.html',
})
export class OfficialPanelComponent {
   name = signal('');

  // Calculate font size based on name length to avoid overflow
  getFontSize() {
    const length = this.name().length;
    let size;
    if (length <= 3) size = 50;
    else if (length <= 6) size = 40;
    else if (length <= 10) size = 30;
    else if (length <= 15) size = 25;
    else size = 20;

    if (length > 6) size += 2;
    if (length > 10) size += 3;
    if (length > 15) size += 5;
    if (length > 20) size += 5;
    return size;
  }

  updateName(event: Event) {
    const input = event.target as HTMLInputElement;
    // Enforce uppercase
    this.name.set(input.value.toUpperCase());
  }

  downloadCard() {
    // Use canvas drawing to avoid html2canvas issues with modern CSS
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/base.webp'; // Base image

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return;

      // Draw base image
      ctx.drawImage(img, 0, 0);

       // Draw name text
       ctx.fillStyle = '#000000'; // Black text
       ctx.font = `${this.getFontSize() * 2.7}px "Anton", sans-serif`; // Match HTML font size
       ctx.textAlign = 'left'; // Approximate positioning
       ctx.fillText(this.name().toUpperCase(), canvas.width * 0.08, canvas.height * 0.25 + 5); // Position to match CSS top-[18%] + mt-[5px]

      // Download
      const link = document.createElement('a');
      link.download = `AFICHE-${this.name()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.onerror = () => {
      alert('Error al cargar la imagen base. Por favor intenta de nuevo.');
    };
  }

  share() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/base.webp';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (!ctx) return;

       ctx.drawImage(img, 0, 0);
       ctx.fillStyle = '#000000';
       ctx.font = `${this.getFontSize() * 2.7}px "Anton", sans-serif`;
       ctx.textAlign = 'left';
       ctx.fillText(this.name().toUpperCase(), canvas.width * 0.01, canvas.height * 0.25 + 5);

      canvas.toBlob((blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], `AFICHE-${this.name()}.png`, { type: 'image/png' });
          navigator
            .share({
              title: 'Afiche de Xavier',
              text: window.location.href,
              files: [file],
            })
            .catch((error) => {
              console.log('File share failed, trying URL', error);
              // Fallback to URL
              navigator
                .share({
                  title: 'Rumbo a la Alcaldia',
                  text: '',
                  url: window.location.href,
                })
                .catch((urlError) => console.log('URL share failed', urlError));
            });
        } else {
          // Fallback: download
          const link = document.createElement('a');
          link.download = `AFICHE-${this.name()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          alert('Imagen descargada. Comparte manualmente.');
        }
      });
    };

    img.onerror = () => {
      alert('Error al cargar la imagen base.');
    };
  }
}
