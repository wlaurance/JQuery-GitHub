//cookie.js

(function($){
    var HyperCache = function() {
        var obj = this;
        
        this.setCookie = function(name, value, expires)
        {
            alert("hallo!");
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
