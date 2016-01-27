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
            
            var participant = this.store.createRecord('participant', {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                gender: gender,
                gestationalAgeAtBirth: gestationalAgeAtBirth
            });
            
            console.log(participant);
            
            this.set('newFirstName','First Name');
            this.set('newLastName','Last Name');
            this.set('newBirthday','DD/MM/YYYYY');
            
            participant.save();
        }
    }
});
