export class Image {
	private readonly _format: any;
	private readonly _source: string;
	private readonly _trans: any;
	private readonly _width: number;
	private readonly _height: number;

	constructor(data) {
		this._format = data.format;
		this._source = data.source;
		this._trans = data.trans;
		this._width = data.width;
		this._height = data.height;
	}

	get format(): any {
		return this._format;
	}

	get source(): string {
		return this._source;
	}

	get trans(): any {
		return this._trans;
	}

	get width(): number {
		return this._width;
	}

	get height(): number {
		return this._height;
	}


}
