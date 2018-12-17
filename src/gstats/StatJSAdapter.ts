import {BaseHooks} from "./BaseHooks";
import * as Stats from "stats.js";

export class StatsJSAdapter {
	public _stats: Stats;
	public dcPanel?: any;
	public tcPanel?: any;
	public hook: BaseHooks;

	constructor(_hook: BaseHooks) {
		this._stats = new Stats();
		this.hook = _hook;

		this.dcPanel = this._stats.addPanel(new Stats.Panel("DC:", "#330570", "#A69700"));
		this.tcPanel = this._stats.addPanel(new Stats.Panel("TC:", "#A62500", "#00B454"));
		this._stats.showPanel(0);
	}


	update(): void {
		if (this.hook) {

			this.dcPanel.update(this.hook.deltaDrawCalls, Math.max(50, this.hook.maxDeltaDrawCalls));
			this.tcPanel.update(this.hook.texturesCount, Math.max(20, this.hook.maxTextureCount));

		}

		if (this._stats) {
			this._stats.update();
		}
	}

}
