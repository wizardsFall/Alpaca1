
/*jslint browser: true*/
/*global $, jQuery, alert*/
if (!window.gAlp) {
    window.gAlp = {};
}

window.gAlp.Config = (function () {
    "use strict";
    var config = {
        features: {
            id: "getElementById",
            tags: "getElementsByTagName",
            "class": "getElementsByClassName",
            query: "querySelector",
            queryAll: "querySelectorAll",
            get: "getAttribute",
            set: "setAttribute"
        },
        contents: {
            content: "#content",
            slides: "#swapping",
            show: "body",
            place_holder: "#placeholder",
            thumbnails: "#thumbnails",
            placeholder: {
                tag: "div",
                attrs: {
                    id: "placeholder"
                },
                children: [
                    
                     {
                        tag: "div",
                        attrs: {
                            id: "swapping"
                        }
                    },
                    
                    {
                        tag: "div",
                        attrs: {
                            id: "controls"
                        },
                        
                       //paste here...                     
                          
                    children: [
                    
                    {
                        tag: "div",
                        attrs: {
                            "class": "buttons"
                        },

                        children: [{
                            tag: "button",
                            attrs: {
                                "class": "controls",
                                id: "reverse"
                            },
                            content: "&lt;"
                        },
                            {
                                tag: "button",
                                attrs: {
                                    "class": "controls",
                                    id: "play"
                                },
                                content: "" //play

                            },
                            {
                                tag: "button",
                                attrs: {
                                    "class": "controls",
                                    id: "forward"
                                },
                                content: "&gt;"
                            }
                            ]
                    },
                        
                        {

                    tag: "div_1",
                    attrs: {
                        "class": "buttons"
                    },

                    children: [{
                        tag: "button",
                        attrs: {
                            "class": "controls",
                            id: "reload"
                        },
                        content: "&#x2716;"
                    }]
                }
                        ]  
                        
                  },//control div                    

                   
                ] //placeholder children            
            } //placeholder
        } //contents
    }; //config
    return {

        getn$: function (arg) {
            return arg;
        },

        getContents: function (str, n) {
            var key, symbols = ['#', '.'],
                el = config.contents[str],
                hash = {
                    '#': 'getId',
                    '.': 'getClass',
                    '<': 'getTags'
                },
                method,
                symbol;

            symbol = el.charAt(0);

            if (hash.hasOwnProperty(symbol)) {
                str = el.substring(1);
                method = this[hash[symbol]];
            }

            if (method) {
                return method(str);
            }
        },


        getPlaceholder: function (str) {
            var content = config.contents;
            if (str) {
                return content.placeholder[str];
            }
            return content.placeholder;
        },
        getFeatures: function (str) {
            return config.features[str];
        },

        getFeature: function (feature, container, index) {
            //test for features, byId, TagName, setAttribute
            var doc = this.getn$(container) || document,
                symbols = ['#', '.'];
            if (doc[feature]) {
                /* Allows for jquery selector "#myid" or vanilla "id" where n could be "#" */
                return function (key, val) {
                    if (!key) {
                        return null;
                    }
                    if (symbols.indexOf(key.charAt()) !== -1) {
                        key = key.substring(1);
                    }
                    if (!val) { //retrieval

                        if (typeof key === 'string') {
                            var res = doc[feature](key);
                            if (res && typeof res.length !== 'undefined' && index) {
                                return res[index];
                            }
                            return res;
                        }
                    } //assignment
                    return doc[feature](key, val);
                };
            }
            return null;
        }/*,

        buildAttributeSelector: function (conf) {
            var tag = conf.getTag(),
                searchTerm = [],
                searchTerms = [];
            _.each(conf.getAttrs(), function(value, key) {
                searchTerm = [tag];
                searchTerm.push("[");
                searchTerm.push(key);
                searchTerm.push("='");
                searchTerm.push(value);
                searchTerm.push("']");
                searchTerms.push(searchTerm.join(""));
            });
            return searchTerms;
        }
    }*/

    };
    
}());