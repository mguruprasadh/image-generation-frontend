import { Component } from '@angular/core';
import { UploadService } from './upload.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  promptText: string = '';
  isLoading: boolean = false;
  isFileMode: boolean = true; // Toggle state

  constructor(private imageService: UploadService) {}

  /** Handle file selection */
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /** Upload the selected file */
  uploadFile() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.imageService.uploadFile(this.selectedFile).subscribe(
        (imageBlob) => {
          this.displayImage(imageBlob);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error generating image:', error);
          this.isLoading = false;
        }
      );
    }
  }

  /** Generate an image from text prompt */
  generateImage() {
    if (this.promptText.trim()) {
      this.isLoading = true;
      this.imageService.generateImage(this.promptText).subscribe(
        (imageBlob) => {
          this.displayImage(imageBlob);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error generating image:', error);
          this.isLoading = false;
        }
      );
    }
  }

  /** Convert blob response to an image URL */
  private displayImage(imageBlob: Blob) {
    const reader = new FileReader();
    reader.onload = () => this.imageUrl = reader.result as string;
    reader.readAsDataURL(imageBlob);
  }

  /** Toggle between file upload and prompt-based image generation */
  toggleMode() {
    this.isFileMode = !this.isFileMode;
    this.selectedFile = null;
    this.promptText = '';
    this.imageUrl = null;
  }
}
  // file: File | null = null;
  // imageUrl: string = '';
  // isProcessing: boolean = false;
  // errorMessage: string = '';

  // constructor(private uploadService: UploadService) {}

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.file = input.files[0];
  //     this.errorMessage = ''; // Clear previous error if a new file is selected
  //   }
  // }

  // onUpload(): void {
  //   if (!this.file) {
  //     this.errorMessage = 'Please select a file first.';
  //     return;
  //   }

  //   this.isProcessing = true;
  //   this.imageUrl = '';
  //   this.errorMessage = '';

  //   this.uploadService.uploadFile(this.file).subscribe({
  //     next: (response) => {
  //       this.imageUrl = response.imageData; // Use the correct key from API response
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.message || 'Failed to upload file.';
  //     },
  //     complete: () => {
  //       this.isProcessing = false;
  //     },
  //   });
  // }


  // query: string = '';
  // selectedFile: File | any;
  // responseText: string = '';
  // responseImage: string | any;

  // constructor(private fileUploadService: UploadService) {}

  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //   }
  // }

  // sendQuery() {
  //   if (!this.query) {
  //     alert('Please enter a query');
  //     return;
  //   }

  //   this.fileUploadService.sendQuery(this.query, this.selectedFile).subscribe(
  //     (response: { response: string; image_data: ''; }) => {
  //       this.responseText = response.response;
  //       this.responseImage = response.image_data || '';
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //       alert('Error processing request');
  //     }
  //   );
  // }