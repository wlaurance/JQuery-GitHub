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
        elem.hyperCache();
        var hyperCache = elem.data('hyperCache');

        this.getRepos = function(userId)
        {
            if (hyperCache.get("repos") == null)
                {

                    $.ajax({
                            url: baseURL+"/users/"+userId+"/repos",
                            dataType: 'jsonp',
                            cache: true,
                            success: function(repos){
                                processRepos(repos);
                                hyperCache.store("repos", repos, 300);
                            }
                        });
                }
            else 
                {
                    processRepos(JSON.parse(hyperCache.get("repos")));
                }
            
        }
        
        var processRepos = function(repos)
        {
            $.each(repos, function(key,value){
                    $.each(repos[key], function(k,v){
                            if (v["name"] != undefined){
                                if(v["description"] == null)
                                    v["description"] = "No description";
                                elem.append("<li><a href=\""+ v["html_url"] + "\"+ title=\""+ v["description"] + "\" target=\"__blank\">"  + v["name"] + "</a></li>"); 
                            }
                                
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