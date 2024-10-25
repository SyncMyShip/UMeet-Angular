import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA)
        public data: {
            title: string,
            content: string
        },
        public dialogRef: MatDialogRef<MovieDetailsComponent>
    ) {}

    ngOnInit(): void {}

    closeMovieDetails(): void {
        this.dialogRef.close();
    }

}