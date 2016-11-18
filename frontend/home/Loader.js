export class contextLoader
{
	constructor()
	{
		this._context = {};
        this._initializers = [];
	}

    addInitializer(initializer)
    {
        this._initializers.push(initializer);
    }

	has(key) { return !!this._context[key]; }

	get(key,callback)
	{
		if (this.has(key)) return this._context[key];
		else return undefined;
	}

	init(context) 
    { 
        this._context = context; 
        this._initializers.forEach(initializer => { initializer(this._context); });
    }
}


var Loader = new contextLoader();
global.Loader = Loader;
export default Loader;
