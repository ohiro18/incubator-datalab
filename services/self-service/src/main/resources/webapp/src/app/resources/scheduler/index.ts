/***************************************************************************

Copyright (c) 2018, EPAM SYSTEMS INC

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material.module';
import { ModalModule, BubbleModule } from '../../shared';
import { FormControlsModule } from '../../shared/form-controls';
import { SchedulerComponent } from './scheduler.component';
import { TimePickerModule } from '../../shared/time-picker';

export * from './scheduler.component';
export * from './scheduler.model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FormControlsModule,
    MaterialModule,
    BubbleModule,
    TimePickerModule
  ],
  declarations: [SchedulerComponent],
  exports: [SchedulerComponent]
})
export class SchedulerModule {}
