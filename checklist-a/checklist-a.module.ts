import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ChecklistAPageRoutingModule } from './checklist-a-routing.module';
import { ChecklistAPage } from './checklist-a.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
    declarations: [ChecklistAPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChecklistAPageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule
    ]
})
export class ChecklistAPageModule {}
