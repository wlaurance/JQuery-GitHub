//hypercache.js
//Utilizes HTML 5 local storage

(function($){
    var HyperCache = function() {
        var obj = this;
        var cannon = "-expires";
        
        this.store = function(name, value, expires)
        {
            localStorage.setItem(name, JSON.stringify(value));
            var expiry = new Date();
            expiry.setSeconds(expiry.getSeconds() + expires);
            localStorage.setItem(name+cannon, expiry.toUTCString());
        }

        this.get = function(name)
        {
            var ex = localStorage.getItem(name+cannon);
            if (ex == null)
                return null;

            var date = new Date();
            var expiry = new Date(ex);

            if (date > expiry)
                return null;
            else
                return localStorage.getItem(name);
        }
    };
    
    $.fn.hyperCache = function() {
        return this.each(function()
        {
            var element = $(this);
            if(element.data('hyperCache')) return;
            var hyperCache = new HyperCache();
            element.data('hyperCache', hyperCache);
        });
    }
})(jQuery);
