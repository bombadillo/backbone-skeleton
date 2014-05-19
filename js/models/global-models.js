/**
 *  Miscellaneous model & collection, used for any form of request.
 */
var BasicModel = Backbone.Model.extend(
{
    defaults:
    {
        data: [],
        // Base url that will be used for the request.
        urlRoot: '',            
    },

    // This function can be used to alter the url such as add parameters for GET requests..
    url: function ()
    {
        var params = (this.get('params')) ? this.get('params') : '';   

        return this.get('urlRoot') + params;
    },

    // This function can be used to access the data before the fetch success or error functions are invoked.
    // Useful for performing type conversions, error checking, etc.
    parse: function (data, xhr)
    {
        // Set errors to false initially.
        data.errors = false;

        if (data.responseCode < 1 || data.errorCode < 1)
        {            
            data.errors = true;
        }

        return data;
    }
});


var BasicCollection = Backbone.Collection.extend(
{
    model: BasicModel,

    // This function can be used to alter the url such as add parameters for GET requests..
    url: function()
    {
        var params = (this.params) ? this.params : '';
        return this.urlRoot + params;       
    },

    // This function can be used to access the data before the fetch success or error functions are invoked.
    // Useful for performing type conversions, error checking, etc.
    parse: function (data, xhr)
    {
        // Set errors to false initially.
        this.errors = false;        
        
        if (data.responseCode < 1 || data.errorCode < 1)
        {            
            this.errors = true;
        }

        return data;
    },

    // This function is used to paginate a collection. 
    pagination : function(perPage, page) 
    {
        var collection = this;
        page = page-1;

        // Returns the rest of the models in the collections.
        collection = _(collection.rest(perPage*page));
        // Returns the first page of the collection.
        collection = _(collection.first(perPage));    

        // Produces a new collection by transforming each model using the attributes set above.
        return collection.map( function(model) { return model.toJSON() } ); 
    }           

});
/*********************************************/


/**
 *  Name      removeAll - Called using collection.removeAll(). 
 *  Purpose   Extend the Backbone Collection object by adding removeAll function.
 */
Backbone.Collection.prototype.removeAll = function() 
{
    // Var to hold each individual model in collection.
    var model = undefined;

    // While there is a first model.
    while (model = this.first()) 
    {
        // Delete model from collection.
        model.destroy();
    }     
    // END loop.  
};
/*********************************************/
