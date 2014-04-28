app.HomeController = 
{
	// You can put variables here (controller attributes) which you can use in controller scope
	// as follows: "this.variableName".
	
	/*----- Template Demo Specific ------*/

		// Object containing required plugins.
		oRequiredPlugins: 
		{
			'jQuery': {'test': 'jQuery', 'info': 'A JavaScript framework which eases the development by providing a set of useful functions.', 'link': 'http://api.jquery.com/'},
			'jQuery UI' : {'test': 'jQuery.ui', 'info': 'Provides greater UI options that are made specifically for jQuery.', 'link': 'http://jqueryui.com/'},
			'bootstrap': {'test': '$.fn.modal', 'info': 'Has loads of useful features such as modals, tooltips, carousels, and many more.', 'link': 'http://www.getbootstrap.com/'}, 
			'backbone': {'test': 'Backbone', 'info': 'Literally the backbone of the app. Cracking MV* framework.', 'link': 'http://backbonejs.org/'},
			'underscore': {'test': '_', 'info': 'Toolset which goes hand in hand with Backbone (in fact, it is needed!).', 'link': 'http://underscorejs.org/'}, 
			'head': {'test': 'head', 'info': 'Allows us to de-clutter index.html from all the JavaScript script calls.', 'link': 'http://headjs.com/'}, 
			'date picker': {'test': '$.fn.datepicker', 'info': 'Datepicker made specifically for Bootstrap.', 'link': 'http://bootstrap-datepicker.readthedocs.org/en/latest/'}			
		},
		// Dom Elements.
		elPluginChecklist: '#js-plugin-checklist',

		// Templates.
		pluginChecklistTemplate: '#js-plugin-checklist-template',

	/*----------------------------------*/

	/* Name      start
	* Purpose   To start the app loading all necessary models, collections, views and any
	*       	other necessary objects.
	*/     	
	start: function() 
	{
		app.log('Home Controller initiated.', 'initiated');
		app.log('Start building the app!');

		// Assign controller scope to variable.
	    var $this = this;

	    // Use underscore extend function to assign Backbone events object to controller.
	    _.extend(this, Backbone.Events);  		

		/*----- Template Demo Specific ------*/

		    // Call function to render demo template.
		    this.renderDemoTemplate();

		    // Call function to check that all plugins are working.
		    this.checkPlugins();
		   
		    /*
		     	DOM event listeners
		     */
		    // It's still OK to use jQuery event listeners. However, generally it's best to keep them in views.
		    
		    // Listen for mouse hovering over plugin checklist item.
		    $(document).on('mouseenter', '#js-plugin-checklist .list-group-item', function()
		    {
		    	// Assign the current element, converted to a jQuery object, to a variable.
		    	var el = $(this);
		    	// Add the class to the element.
		    	el.addClass('focused');

		    	// Set a timeout to be performed after the amount specified in the second parameter (in this case 300 miliseconds).
		    	setTimeout(function()
		    	{
		    		// If the element has the class.
		    		if (el.hasClass('focused'))
		    		{
		    			// Slide down the element.
						el.find('.info').slideDown();
		    		}
		    	}, 400);		    	
		    	// END timeout.
		    });

		    // Listen for mouse leaving a hovered plugin checklist item.
		    $(document).on('mouseleave', '#js-plugin-checklist .list-group-item', function()
		    {
		    	// Remove the class from the element.
		    	$(this).removeClass('focused');
		    	// Slide the element up.
		    	$(this).find('.info').slideUp();
		    })		    

		    /* END DOM event listeners */

		/*----------------------------------*/

	},
	
	/*----- Template Demo Specific ------*/
	// This sort of functionality should be put into a view. However, it's been implemented this way
	// to show that you can still use traditional jQuery event listners.

		/* Name      checkPlugins
		* Purpose    To check that each of the required plugins have started.
		*/     		
		checkPlugins: function()
		{
			// Assign controller scope.
			var $this = this;

			// Call function to load template.
			app.requireTemplate('js-plugin-checklist-template');

			// Use underscore each function to iterate object. First param is the object to be iterated
			// whilst the second param is the anonymous function to be called per iteration.
			_.each(this.oRequiredPlugins, function(plugin, key)
			{
				// Assign the key of the current plugin object to a new attribute "name".
				plugin.name = key;

				// If the evaluated string returns something then the plugin exists. Assign result to object.
				plugin.loaded = (eval(plugin.test));
				
				// Use underscore template function to populate template with data.
				var tpl = _.template($($this.pluginChecklistTemplate).html(), plugin);

				// Append template to element.
				$($this.elPluginChecklist).append(tpl);
				
			});

			// Add tooltips for any unloaded plugins.
			if ($(this.elPluginChecklist).find('.not-loaded'))
			{
				$(this.elPluginChecklist).find('.not-loaded').tooltip(
				{ 
					// Add delay for displaying tooltip. 
					delay: {'show': 600 } 
				});	
			} 
		},

		/* Name      renderDemoTemplate
		* Purpose    To render the template for the demo.
		*/     		
		renderDemoTemplate: function()
		{
			// Get the template. 
			app.requireTemplate('demo-template');			

			// Populate DOM with it.
			$('#demo-container').html($('#demo-template').html());
		}


	/*----------------------------------*/

	/*
		Put functions here that you want to be used within controller. They can be accessed in controller scope
		by using 'this' e.g. 'this.functionName(param)'.
	 */	
}