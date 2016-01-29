import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
    email: DS.attr('string'),
    participants: DS.hasMany('participant'),
    demographics: DS.hasMany('demographic')
});
