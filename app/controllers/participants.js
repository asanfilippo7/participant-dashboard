import Ember from 'ember';

export default Ember.Controller.extend({
    
    selectedGender: "Male",
    genders: ["Male","Female","Other or prefer not to answer"],
    
    selectedGestationalAge: "40 weeks (around due date)",
    gestationalAges: ["Under 24 weeks", "24 weeks", "25 weeks", "26 weeks", "40 weeks (around due date)", "Not sure or prefer not to answer"],
    
    actions: {
        createParticipant: function() {
            var firstName = this.get('newFirstName');
            var lastName = this.get('newLastName');
            var birthday = new Date(this.get('newBirthday'));
            var gender = this.get('selectedGender');
            var gestationalAgeAtBirth = this.get('selectedGestationalAge');
//            NOTE: the findRecord call below will need to be modified to be dynamic
            var parent = this.store.peekRecord('account',1);
            
            var participant = this.store.createRecord('participant', {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                gender: gender,
                gestationalAgeAtBirth: gestationalAgeAtBirth,
                account: parent
            });
            
            participant.save();
            
            console.log('participant: ', participant);
            
            var account = this.store.findRecord('account',1).then(function(updated) {
                console.log("updating account now");
                var toAdd = [];
                toAdd.push(participant);
                updated.set('participants', toAdd);
            });
            
            this.set('newFirstName','First Name');
            this.set('newLastName','Last Name');
            this.set('newBirthday','DD/MM/YYYYY');
            
        },
        
        editAccount: function() {
            var name = this.get('newAccountName');
            var email = this.get('newAccountEmail');
            
//            NOTE: The findRecord call below will need to be modified to be dynamic
            var account = this.store.findRecord('account',1).then(function(updated) {
                updated.set('name', name);
                updated.set('email', email);
            });
        }
    }
});
