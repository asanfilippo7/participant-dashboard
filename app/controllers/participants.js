import Ember from 'ember';

export default Ember.Controller.extend({
//    Get the ID for the currently logged in account
    accountController: Ember.inject.controller('application'),
    accountID: Ember.computed.reads('accountController.model.id'),
    
    selectedGender: "Male",
    demographicGender: "Other or prefer not to answer",
    genders: ["Male","Female","Other or prefer not to answer"],
    
    selectedGestationalAge: "40 weeks (around due date)",
    gestationalAges: ["Under 24 weeks", "24 weeks", "25 weeks", "26 weeks", "40 weeks (around due date)", "Not sure or prefer not to answer"],
    
    selectedAge: "Prefer not to answer",
    ages: ["Under 18 years","18-24","25-35","35-45","45-60","Over 60","Prefer not to answer"],
    
    selectedEducation: "High School",
    education: ["High School/GED","Associate's Degree","Bachelor's Degree","Masters Degree","Doctorate"],
    
    selectedIncome: "0-10,000",
    incomes: ["Prefer not to answer","0-10,000","10-20,000","20-30,000","30-40,000","40-50,000","50-60,000","60-70,000","70-80,000","80-90,000","90-100,000","100,000+"],
    
    selectedContacted: "Prefer not to answer",
    contacted: ["Yes","No","Prefer not to answer"],
    
    selectedAppointment: "Prefer not to answer",
    appointment: ["Yes","No","Prefer not to answer"],
    
    fillDemographics: true,
    
    actions: {
//        To add a new participant in the Children Information tab
        createParticipant: function() {
            var firstName = this.get('newFirstName');
            var lastName = this.get('newLastName');
            var birthday = new Date(this.get('newBirthday'));
            var gender = this.get('selectedGender');
            var gestationalAgeAtBirth = this.get('selectedGestationalAge');
            var accountID = this.get('accountID');
            var parent = this.store.peekRecord('account',accountID);
            
            var participant = this.store.createRecord('participant', {
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                gender: gender,
                gestationalAgeAtBirth: gestationalAgeAtBirth,
                account: parent
            });
            
            participant.save();
            
            var account = this.store.findRecord('account',accountID).then(function(updated) {
                var toAdd = [];
                toAdd.push(participant);
                updated.set('participants', toAdd);
            });
            
            this.set('newFirstName','First Name');
            this.set('newLastName','Last Name');
            this.set('newBirthday','DD/MM/YYYYY');
            
        },
        
//        To update account information in the Account Info tab
        editAccount: function() {
            var name = this.get('newAccountName');
            var email = this.get('newAccountEmail');
            var accountID = this.get('accountID');
            
            var account = this.store.findRecord('account',accountID).then(function(updated) {
                updated.set('name', name);
                updated.set('email', email);
            });
        },
        
//        To save a new demographic survey
        newDemographicSurvey: function() {
            
            var languages = this.get('languages');
            var numberOfChildren = this.get('numberOfChildren');
            var childBirthdates = this.get('childBirthdates');
            var numberOfParents = this.get('numberOfParents');
            var race = this.get('race');
            var age = this.get('selectedAge');
            var gender = this.get('demographicGender');
            var educationLevel = this.get('selectedEducation');
            var income = this.get('selectedIncome');
            var contacted = this.get('selectedContacted');
            var appointment = this.get('selectedAppointment');
            var additionalComments = this.get('additionalComments');
            var accountID = this.get('accountID');
            var parent = this.store.peekRecord('account',accountID);
            console.log(languages);
            
//            If the account holder has already filled out a survey 
            if(parent.get('demographics') != null) {
                console.log('updating demographic record');
                var demo = parent.get('demographics');
                demo.set('languages',languages);
                demo.set('numberOfChildren',numberOfChildren);
                demo.set('childBirthdates',childBirthdates);
                demo.set('numberOfParents',numberOfParents);
                demo.set('race',race);
                demo.set('age',age);
                demo.set('gender',gender);
                demo.set('educationLevel',educationLevel);
                demo.set('income',income);
                demo.set('contacted',contacted);
                demo.set('appointment',appointment);
                demo.set('additionalComments',additionalComments);
            }
            
//            If the account holder hasn't filled out a survey yet
            else {
                console.log('creating demographic record');
                var demographic = this.store.createRecord('demographic', {
                    languages: languages,
                    numberOfChildren: numberOfChildren,
                    childBirthdates: childBirthdates,
                    numberOfParents: numberOfParents,
                    race: race,
                    age: age,
                    gender: gender, 
                    educationLevel: educationLevel,
                    income: income,
                    contacted: contacted,
                    appointment: appointment,
                    additionalComments: additionalComments,
                    account: parent
                });

                demographic.save();

                var account = this.store.findRecord('account',accountID).then(function(updated) {
                    var toAdd = [];
                    toAdd.push(demographic);
                    updated.set('demographics', toAdd);
                });
            }
            
            this.set('fillDemographics',false);
            this.set('languages',' ');
            this.set('numberOfChildren',' ');
            this.set('childBirthdates',' ');
            this.set('numberOfParents',' ');
            this.set('race',' ');
            this.set('additionalComments',' ');
        },
        
        redoDemographicSurvey: function() {
            this.set('fillDemographics',true);
        }
        
    }
});
