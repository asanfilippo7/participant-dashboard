import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    gender: DS.attr('string'),
    gestationalAgeAtBirth: DS.attr('string')
});
