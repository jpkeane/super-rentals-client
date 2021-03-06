import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  city: DS.attr('string'),
  bedrooms: DS.attr('string'),
  image: DS.attr('string'),
  dailyRent: DS.attr('number'),
  rentPaymentPeriod: DS.attr('string'),
  landlord: DS.belongsTo('landlord', {async: true}),
  propertyType: DS.belongsTo('property-type', {async: true}),
  rentalState: DS.belongsTo('rental-state', {async: true}),

  defaultRent: Ember.computed('dailyRent', 'rentPaymentPeriod', function() {
    if (this.get('rentPaymentPeriod') === 'weekly') {
      return Math.round(this.get('dailyRent') * 7);
    } else if (this.get('rentPaymentPeriod') === 'pcm') {
      return Math.round((this.get('dailyRent') * 365) / 12);
    } else if (this.get('rentPaymentPeriod') === 'quadweekly') {
      return Math.round(this.get('dailyRent') * 28);
    } else if (this.get('rentPaymentPeriod') === 'daily') {
      return Math.round(this.get('dailyRent'));
    }
  })
});
