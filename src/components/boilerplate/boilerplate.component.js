/**
 * Example ES6 class
 */
export default class BoilerplateComponent{

    /**
     * @param  {string} hello
     */
    constructor(hello){
        this.setHello(hello);
    }


    /**
     * Getter.
     * @return {string}
     */
    getHello(){
        return this.hello;
    }


    /**
     * Setter.
     * @param {string} hello
     */
    setHello(hello){
        // validation
        if(typeof hello != 'string'){
            throw new Error('BoilerplateComponent: Invalid argument `hello`');
        }

        this.hello = hello;
    }


    /**
     * Render helper.
     * @return {string}
     */
    render(){
        return `
            <div class="boilerplate-component">
                <h1>Hello ${this.getHello()}!</h1>
            </div>
        `;
    }

};
