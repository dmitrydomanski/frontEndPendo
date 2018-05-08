import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatCardModule,
   MatInputModule,
   MatFormFieldModule,
   MatToolbar,
   MatTableModule,
   MatToolbarModule,
   MatTableDataSource } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainDisplayComponent } from './components/main-display/main-display.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataService } from './services/data.service';
import { RisePipe } from './pipes/rise-time.pipe';
import { DurationPipe } from './pipes/dur-time.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MainDisplayComponent,
    DataTableComponent,
    RisePipe,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpModule,
    MatTableModule,
    FormsModule,
    CdkTableModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
