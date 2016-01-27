import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        console.log('route running, checking the model');
        console.log(this.store.findAll('participant'));
        return this.store.findAll('participant');
    },
});
