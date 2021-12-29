import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { PouchDbService, TagDoc } from '../services/pouch-db.service';

@Component({
	selector: 'app-edit-pupil',
	templateUrl: './edit-pupil.component.html',
	styleUrls: ['./edit-pupil.component.scss'],
})
export class EditPupilComponent implements OnInit {
	_tagDoc!: TagDoc;
	pupilForm = new FormGroup({});

	@Input('tagDoc') set tagDoc(tagDoc: TagDoc) {
		console.log(tagDoc);

		if (tagDoc) {
			this._tagDoc = tagDoc;
			this.pupilForm = new FormGroup({});
			this.createPupilForm(tagDoc, this.pupilForm);
		}
	}

	get categoryId(): TagDoc {
		return this._tagDoc;
	}

	@Output('pupilEdited') pupilEdited = new EventEmitter();

	constructor(private pouchDbService: PouchDbService) {}

	ngOnInit() {}

	createPupilForm = (pupil: TagDoc, pupilForm: FormGroup) => {
		for (let field of Object.entries(pupil)) {
			pupilForm.addControl(
				field[0],
				new FormGroup({
					key: new FormControl(field[0]),
					value: new FormControl(field[1]),
				})
			);
		}
	};

	getFormGroupKeys = (obj: { [key: string]: AbstractControl }) => {
		return Object.keys(obj);
	};

	saveChanges = async () => {
		const updatedDocArr = [];

		for (let [_, value] of Object.entries<{ key: string; value: string }>(
			this.pupilForm.value
		)) {
			updatedDocArr.push([value.key, value.value]);
		}

		await this.pouchDbService.updateTag(Object.fromEntries(updatedDocArr));
		this.pupilEdited.emit();
	};

	addRow = () => {
		this.pupilForm.addControl(
			Math.random().toString(36),
			new FormGroup({
				key: new FormControl(''),
				value: new FormControl(''),
			})
		);
	};
}
