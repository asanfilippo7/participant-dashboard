import Ember from 'ember';

export default Ember.Route.extend({
    model() {
//        Only return the participants that belong to the logged in account
        return this.modelFor('application').get('participants');
    },
});
