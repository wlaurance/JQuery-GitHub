//github.js

//Thanks to Hector Virgin
//http://www.virgentech.com/blog/2009/10/building-object-oriented-jquery-plugin.html

//Wrap code in anonymous function
(function($){
    var GitHubPortal = function(element)
    {
        var elem = $(element);
        var obj = this;
        var baseURL = 'https://api.github.com';
        

        this.getRepos = function(userId)
        {
            
            $.ajax({
                    url: baseURL+"/users/"+userId+"/repos",
                        dataType: 'jsonp',
                        cache: true,
                        success: function(repos){
                        myRepos = repos;
                        processRepos(myRepos);
                    }
                });
                               
        }
        
        var processRepos = function(repos)
        {
            $.each(myRepos, function(key,value){
                    $.each(myRepos[key], function(k,v){
                            if (v["name"] != undefined)
                                elem.append("<li><a href=\""+ v["html_url"] + "\">"  + v["name"] + "</a></li>"); 
                        });
                });
        };
    };
    
    $.fn.gitHubPortal = function()
    {
        return this.each(function()
        {
            var element = $(this);
            if(element.data('gitHubPortal')) return;
            var gitHubPortal = new GitHubPortal(this);
            element.data('gitHubPortal', gitHubPortal);
        });
                         
    };
})(jQuery);