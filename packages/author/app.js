'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Author = new Module('author');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Author.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Author.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Author.menus.add({
    title: 'author example page',
    link: 'author example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Author.aggregateAsset('css', 'author.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Author.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Author.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Author.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Author;
});
