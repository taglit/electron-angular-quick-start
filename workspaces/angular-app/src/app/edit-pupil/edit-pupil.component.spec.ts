import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPupilComponent } from './edit-pupil.component';

describe('EditPupilComponent', () => {
	let component: EditPupilComponent;
	let fixture: ComponentFixture<EditPupilComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EditPupilComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditPupilComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
