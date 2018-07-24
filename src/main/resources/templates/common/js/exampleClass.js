class ExampleClass {
    constructor(message, value, project = 'Example', arrayValue = [0, 1]) {
        this._message = message;
        this._value = value;
        this._project = project;
        this._arrayValue = arrayValue;
    }

    getMessage() {
        return `Message is ${this._message} and Value is ${this._value} and ArrayValue is ${JSON.stringify(this._arrayValue)} and Project name is ${this._project}`;
    }

    get project() {
        return this._project;
    }

    set project(value) {
        this._project = value;
    }
}

export default ExampleClass;
