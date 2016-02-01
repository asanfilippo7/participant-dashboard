import Ember from 'ember';

export default Ember.Route.extend({
//    NOTE: the below properties/functions will likely change in accordance with whatever user authentication method is implemented
    
    routeAccount: 1,
    
    actions: {
        selectAccount: function() {
            console.log('selecting account');
            console.log('selected account: ' + this.controller.get('selectedAccount'));
            this.set('routeAccount',this.controller.get('selectedAccount'));
            console.log('new route account: ' + this.get('routeAccount'));
            this.refresh();
        }
    },
    
    model: function() {
        return this.store.findRecord('account', Number(this.get('routeAccount')));
    }
});
