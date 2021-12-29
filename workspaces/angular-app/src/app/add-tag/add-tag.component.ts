import {
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PouchDbService, TagDoc } from '../services/pouch-db.service';

@Component({
	selector: 'app-add-tag',
	templateUrl: './add-tag.component.html',
	styleUrls: ['./add-tag.component.scss'],
})
export class AddTagComponent implements OnInit, OnDestroy {
	@ViewChild('name', { static: false })
	set input(element: ElementRef<HTMLInputElement>) {
		if (element) {
			element.nativeElement.focus();
		}
	}

	displayedColumns: string[] = ['id', 'name'];
	tableList = new MatTableDataSource<{ _id: string; name: string }>();
	tagHasBeenDetected = false;
	currentCard = '';
	pupilList: TagDoc[] = [];

	currentPupilToEdit: TagDoc | undefined = undefined;

	constructor(private pouchDbService: PouchDbService, private router: Router) {}

	ngOnInit(): void {
		this.keyDownStartListener();
		this.renderPupils();
	}

	public async addName(e: HTMLInputElement) {
		await this.pouchDbService.addTag(this.currentCard, e.value);
		this.resetState();
	}

	renderPupils = async () => {
		this.pupilList = await this.pouchDbService.getAllTags();
		this.tableList.data = this.pupilList.map((pupil) => ({
			_id: pupil._id,
			name: pupil.name,
		}));
		console.log(this.pupilList);
	};

	keyDownStartListener = () => {
		document.addEventListener('keydown', this.captureTags);
	};

	captureTags = (input: KeyboardEvent) => {
		console.log(input);
		if (!isNaN(+input.key) && input.location === 0) {
			this.currentCard += input.key;
		} else if (
			this.currentCard.length === 10 &&
			input.key === 'Enter' &&
			this.currentCard.startsWith('000')
		) {
			input.stopPropagation();
			const pupil = this.pupilList.find(
				(pupil) => pupil?._id === this.currentCard
			);
			if (pupil) {
				if (pupil.manager === 'true') {
					this.router.navigate(['/']);
				}
				this.currentCard = '';
			} else {
				this.tagHasBeenDetected = true;
				this.keyDownStopListener();
				// setTimeout(this.name.nativeElement.focus, 1000)
				console.log(this.currentCard);
			}
		} else if (
			this.currentCard.length >= 10 &&
			input.key === 'Enter' &&
			!this.currentCard.startsWith('000')
		) {
			this.currentCard = '';
		}
	};

	keyDownStopListener = () => {
		document.removeEventListener('keydown', this.captureTags);
	};

	editStudentDetails = (row: TagDoc) => {
		const a = this.pupilList.find((pupil) => pupil._id === row._id);
		this.currentPupilToEdit = this.pupilList.find(
			(pupil) => pupil._id === row._id
		);
	};

	pupilEdited = () => {
		this.currentPupilToEdit = undefined;
		this.renderPupils();
	};

	public resetState() {
		this.currentCard = '';
		this.tagHasBeenDetected = false;
		this.keyDownStartListener();
		this.renderPupils();
	}

	ngOnDestroy() {
		document.removeEventListener('keydown', this.captureTags);
	}
}
