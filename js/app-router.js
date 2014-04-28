// Defines routes for app. 
var AppRouter = Backbone.Router.extend({
    routes: {
        // Basic route:
    	"register"                        : "registerUser",
        // Route with params:
        "market/:id"                      : "getMarket",
        // Route with optional params:
    	"paypalpaymentapproved(/:params)"  : "paypalPaymentApproved",
        // Default route.
        "*actions"                        : "defaultRoute"
    }
});


