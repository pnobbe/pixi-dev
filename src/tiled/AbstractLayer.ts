export abstract class AbstractLayer extends PIXI.Container {

	private readonly _type: string;
	private readonly _name: string;
	private readonly _properties: any;

	protected constructor(props) {
		super();
		this._type = props.type;
		this._name = props.name;
		this._properties = props.properties;
		this.visible = props.visible;
		this.alpha = props.opacity;

	}

	get type(): string {
		return this._type;
	}

	get name(): string {
		return this._name;
	}

	get properties(): any {
		return this._properties;
	}
}
