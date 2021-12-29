import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTagComponent } from './add-tag/add-tag.component';
import { HomePageComponent } from './home-page/home-page.component';
// import { MutiplesComponent } from './components/mutiples/mutiples.component';

const routes: Routes = [
	// {
	//   path: 'MutiplesComponent',
	//   component: MutiplesComponent,
	// },
	{
		path: 'management',
		component: AddTagComponent,
	},
	{
		path: '',
		component: HomePageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
