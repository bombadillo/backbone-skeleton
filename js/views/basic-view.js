var BasicView = Backbone.View.extend(
{

	// View variables.
	fetchInterval: undefined,	
	autoRefresh: undefined,
	refreshInterval: 10000,

	// Default attributes for the view.
	defaults: 
	{
		template: 'script#view-template',
	},

	// DOM events we want to listen for.
	events: 
	{

	},

	/*  Name      initialize
	 *  Purpose   To carry out processes on view instantation e.g. before view is rendered.
	*/    	
	initialize: function(options)
	{
		// Overwrite defaults with any passed in options.
		this.options = _.extend(options, this.defaults);

		// Load the template.
		app.requireTemplate(this.options.template.replace('script#', ''));		

		// Define collection for view and set url.
		this.collection = new BasicCollection();
		this.collection.urlRoot = app.urls.workFlow;

		// Define model for view and set url.
		this.collection = new BasicModel({ urlRoot: app.urls.workFlow });

		// Global event listener.
		this.listenTo(Backbone, 'module:eventName', this.fetchData);		

		// Call function to fetch the data.
		this.fetchData();
	},

	/*  Name      render
	 *  Purpose   To render the template, populated with data, to the view's DOM element.
	*/   
	render: function()
	{
		// Assign view scope.
		var $this = this;

		// Populate template with data.
		var tpl = _.template($(this.options.template).html(), 
		{ 
			collection: this.collection.toJSON(),
			errors: this.collection.errors
		});

		// Populate view's DOM element with template.
		this.$el.html(tpl);

		// Set view variable to true so that we know it has been loaded.
		this.loaded = true;		

		app.log('BasicView', 'viewRender');			
	},

	/*  Name      fetchData
	 *  Purpose   To fetch the data for the main menu.
	*/   
	fetchData: function()
	{
		// Assign view scope.
		var $this = this;


		// Fetch the data
		this.collection.fetch(
		{
			cache: false,
			success: function(collection, response)
			{			
				// Call function to render view.
				$this.render();
			},
			error: function(collection, response)
			{
				// Call function to render view.
				$this.render();
				// Call function to handle error repsonse.
				app.requestErrorHandler(response);
			}
		});
	},

	// Validate the form.
	validateForm: function()
	{
		// Get the form, create object to hold data.
		var form = this.$el.find('form')
		  , obj = {};


		// Loop each of the inputs.
		form.find('input.data').each(function()
		{
			// Assign input object to var.
			var $input = $(this);

			// If the input is a bool type.
			if ($input.data('type') === 'bool')
			{
				// Check for active state.
				obj[$input.attr('name')] = $input.hasClass('active') ? 1 : 0;
			}
			else
			{
				// Call function to validate input.
				app.validateInput($input);	

				// Nab the value and add to object.		
				obj[$input.attr('name')] = $input.val();
			}
		}); 
		// END input loop.

		// If there are no errors.
		if (!form.find('.has-error').length)
		{
			// Call function to submit form.		
			this.submitForm(obj);
		}
	},	


	/*  Name      submitForm
	 *  Purpose   To submit the form.
	 *  Params    {object} data   Contains the data for user to submit.
	*/   
	submitForm: function(data)
	{
		// Assign view scope.
		var $this = this;

		// Set the username for the model.
		this.model.set('username', data.username);

		// Fetch the data
		this.model.save(
		null,
		{
			data: data,
			success: function(model, response)
			{			
				// If there were no errors.
				if (!model.get('errors'))
				{

				}
				// Otherwise there were errors.
				else
				{
	
				}
			},
			error: function(model, response)
			{
							
				// Call function to handle error repsonse.
				app.requestErrorHandler(response);
			}
		});
	},	

	/*  Name      enableRefresh
	 *  Purpose   To create a refresh interval which updates the view's data.
	*/   
	enableRefresh: function()
	{
		// Assign view scope.
		var $this = this;
		// Initially fetch the data since interval will wait until x amount of time has passed.
		this.fetchData();

		// If the interval does not exist then create it.
		if (!this.fetchInterval)
		{
        	$this.fetchInterval = setInterval(function()
        	{
        		$this.fetchData();
        	}, $this.refreshInterval);

        	// Set view variable to true.
        	$this.autoRefresh = true;
		}
	},

	/*  Name      disableRefresh
	 *  Purpose   To disabel the refresh interval which updates the stock market table.
	*/   
	disableRefresh: function()
	{
		// Assign view scope.
		var $this = this;

		// If the interval does not exist then create it.
		if (this.fetchInterval)
		{
 			clearInterval($this.fetchInterval);
 			this.autoRefresh = false;
		}
	},	


	/*  Name      softClose
	 *  Purpose   To softClose the view, removing it's element.
	*/   
	softClose: function()
	{		
		this.$el.html('');
		// Set loaded to false.
		this.loaded = false;		
	}	

});