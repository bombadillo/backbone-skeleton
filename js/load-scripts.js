// Function waits for document to fully load.
head.ready(document, function ()
{
    // Array containing all the scripts we want to load.
    var scripts = [
        /* Assets */
        // Bootstrap.
        '/assets/bootstrap/js/bootstrap.min.js', '/assets/bootstrap/js/datepicker.bootstrap.js',
        // Backbone.
        '/assets/backbone/underscore.min.js', '/assets/backbone/backbone.min.js',
        /* END Assets */

        /* App Code */
        '/js/app-router.js', '/js/app.js', 'js/serverGenJs.php',
        // Models.
        '/js/models/global-models.js', 'js/models/home-models.js',
        // Controllers.
        'js/controllers/home-controller.js'
        // Views.    
    ];

    // Function loads each script in the array and calls the anonymous function on completion.
    head.load(scripts, function ()
    {
        // Call function to start app.
        app.HomeController.start({});
    });
});