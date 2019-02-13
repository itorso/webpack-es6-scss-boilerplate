// example es6 import
import BoilerplateComponent from '@components/boilerplate/boilerplate.component';

// test that all works fine
let boilerplateComponent = new BoilerplateComponent('World');
document.body.innerHTML += boilerplateComponent.render();
