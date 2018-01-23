/***************************************************************************

Copyright (c) 2016, EPAM SYSTEMS INC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

****************************************************************************/

import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CLOCK_TYPE, TimeFormat } from './ticker.component';
type TimeFormatAlias = TimeFormat;

@Component({
  selector: 'dlab-time-picker',
  template: `
    <div class="time-picker">
      <button mat-button (click)="openDatePickerDialog($event)">
        <mat-icon>access_time</mat-icon>
      </button>
      <mat-input-container class="time-select">
        <input matInput placeholder="Select time" [value]="selectedTime">
      </mat-input-container>
  </div>`,
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  @Input() pickTime: TimeFormatAlias;
  @Output() pickTimeChange: EventEmitter<TimeFormatAlias> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (!this.pickTime) {
      this.pickTime = { hour: 12, minute: 0, meridiem: 'AM' };
    }
  }

  private get selectedTime(): string {
    return !this.pickTime ? '' : `${this.pickTime.hour}:${this.pickTime.minute} ${this.pickTime.meridiem}`;
  }

  public openDatePickerDialog($event) {
    const dialogRef = this.dialog.open(TimePickerDialogComponent, {
      data: {
        time: {
          hour: this.pickTime.hour,
          minute: this.pickTime.minute,
          meridiem: this.pickTime.meridiem
        }
      }
    });

    dialogRef.afterClosed().subscribe((result: TimeFormatAlias | -1) => {
      if (result === undefined) return;
      if (result !== -1) {
        this.pickTime = result;
        this.emitpickTimeSelection();
      }
    });
    return false;
  }

  private emitpickTimeSelection() {
    this.pickTimeChange.emit(this.pickTime);
  }
}

@Component({
  selector: 'time-picker-dialog',
  template: `
    <div mat-dialog-content class="timepicker-dialog">
      <time-cover [pickTime]="pickTime" (onReset)="cancel()" (onConfirm)="confirm()"></time-cover>
    </div>`,
  styles: [
    `.content { color: #36afd5; padding: 20px 50px; font-size: 14px; font-weight: 400 }`
  ]
})
export class TimePickerDialogComponent {
  public pickTime: TimeFormatAlias;
  private VIEW_HOURS = CLOCK_TYPE.HOURS;
  private VIEW_MINUTES = CLOCK_TYPE.MINUTES;
  private currentView: CLOCK_TYPE = this.VIEW_HOURS;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { time: TimeFormatAlias; color: string },
    @Inject(MAT_DIALOG_DATA) public color: string,
    private dialogRef: MatDialogRef<TimePickerDialogComponent>
  ) {
    this.pickTime = data.time;
  }

  public cancel() {
    this.dialogRef.close(-1);
  }

  public confirm() {
    this.dialogRef.close(this.pickTime);
  }
}
