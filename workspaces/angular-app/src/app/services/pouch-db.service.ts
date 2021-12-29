import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

export interface TagDoc
	extends PouchDB.Core.ExistingDocument<
		{ asd: string } & PouchDB.Core.AllDocsMeta
	> {
	_id: string;
	manager: string;
	name: string;
}

@Injectable({
	providedIn: 'root',
})
export class PouchDbService {
	db = new PouchDB('tags');

	constructor() {}

	addTag = (id: string, name: string) => {
		return this.db.put({ _id: id, name });
	};

	updateTag = (updatedDocument: string) => {
		return this.db.put(updatedDocument);
	};

	getAllTags = async (): Promise<TagDoc[]> => {
		const docs = await this.db.allDocs<{
			name: string;
			_id: string;
			asd: string;
		}>({ include_docs: true });

		return docs.rows.map((doc) => doc.doc).filter(this.isExistingDocument);
	};

	getTag = async (id: string): Promise<TagDoc> => {
		const doc = await this.db.get<TagDoc>(id);

		return doc;
	};

	isExistingDocument(
		doc: PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta> | undefined
	): doc is TagDoc {
		return (doc as TagDoc)._id !== undefined;
	}
}
