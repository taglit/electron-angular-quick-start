import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { MutiplesComponent } from './components/mutiples/mutiples.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPupilComponent } from './edit-pupil/edit-pupil.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [
		AppComponent,
		// MutiplesComponent,
		AddTagComponent,
		EditPupilComponent,
		HomePageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		MatDialogModule,
		TranslateModule.forRoot({
			defaultLanguage: 'en',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		MatTableModule,
		BrowserAnimationsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
