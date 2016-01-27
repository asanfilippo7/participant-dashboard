import Ember from 'ember';

export default Ember.Route.extend({
    model() {
//        NOTE: The findRecord call below will need to be modified to be dynamic
        return this.store.findRecord('account', 1);
    }
});
