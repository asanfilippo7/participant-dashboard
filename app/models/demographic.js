import DS from 'ember-data';

export default DS.Model.extend({
//    Assumes that we want all of the below to be strings, which may or may not be true
  languages: DS.attr('string'),
    numberOfChildren: DS.attr('string'),
    childBirthdates: DS.attr('string'),
    numberOfParents: DS.attr('string'),
    race: DS.attr('string'),
    age: DS.attr('string'),
    gender: DS.attr('string'),
    educationLevel: DS.attr('string'),
    income: DS.attr('string'),
    contacted: DS.attr('string'),
    appointment: DS.attr('string'),
    additionalComments: DS.attr('string'),
    account: DS.belongsTo('account')
});
