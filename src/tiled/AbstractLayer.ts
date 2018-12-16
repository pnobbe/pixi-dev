export abstract class AbstractLayer extends PIXI.Container {

	private readonly _type: string;
	private readonly _name: string;
	private readonly _properties: any;
	private readonly _opacity: number;
	private readonly _visible: boolean;

	protected constructor(props) {
		super();
		this._type = props.type;
		this._name = props.name;
		this._properties = props.properties;
		this._opacity = props.opacity;
		this._visible = props.visible;

		this.alpha = this.opacity;

	}

	get type(): string {
		return this._type;
	}

	get name(): any {
		return this._name;
	}

	get properties(): any {
		return this._properties;
	}

	get opacity(): any {
		return this._opacity;
	}

	get visible(): any {
		return this._visible;
	}
}
