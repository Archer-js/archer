/**
 * @license
 * Copyright 2020 JudahCorp Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
*/

var Archer = {

    version: "1.0.0",

    type: function(obj){

        return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    },

    extend: function(obj, to){

        var $this = this || to,
        i;

        if(obj && this.type(obj) === "object"){

            for(i in obj){

                $this[i] = obj[i];

            }

        }
        
        return $this;

    },

};

(function(){

    function camelize(a){

        return a.replace(/-+(.)?/g, function(x, y){

            return y ? y.toUpperCase() : '';

        });

    }

    function ElementClass(element){

        this.element = element;

        this.css = function(key, val){

            key = camelize(key);

            if(!val){

                var style = window.getComputedStyle(this.element);

                return style[key];

            }

            if(val){

                this.element.style[key] = val;

            }

        };
        

        this.hide = function(){

            this.hidden = true;
            this.shown = false;
            this.element.style.display = "none";

        };

        this.show = function(){

            this.shown = true;
            this.hidden = false;
            this.element.style.display = "";

        };

        this.html = function(text, add){

            if(!text){

                return this.element.innerHTML;

            }

            if(text){

                if(add && add === true){

                    this.element.innerHTML += text;

                }

                if(!add){

                    this.element.innerHTML = text;

                }

            }

        };

        this.text = function(text, add){

            if(!text){

                return this.element.textContent;

            }

            if(text){

                if(add && add === true){

                    this.element.textContent += text;

                }

                if(!add){

                    this.element.textContent = text;

                }

            }

        };

        this.append = function(el){

            this.element.appendChild(el);

        };

        this.remove = function(){

            this.element.parentNode.removeChild(this.element);

        };

        this.attr = function(key, val){

            if(!val){

                if(this.element.hasAttribute(key) === true){
                    
                    return this.element.getAttribute(key);

                }else{

                    return false;

                }

            }else{

                this.element.setAttribute(key, val);

            }

        };

        this.hasAttr = function(key){

            return this.element.hasAttribute(key);

        };

        this.removeAttr = function(key){

            return this.element.removeAttribute(key);

        };

        this.parent = function(){

            return new ElementClass(this.element.parentNode);

        };

    }

    Archer.element = function(obj){

        var i = 0,
        query,
        arr = [];

        if(obj.nodeType && obj.nodeType === 1){

            return new ElementClass(obj);

        }

        if(Archer.type(obj) === "string"){

            query = document.querySelectorAll(obj);

            if(query.length > 1){

                for(; i < query.length; i++){

                    arr.push(new ElementClass(query[i]));
    
                }

                return arr;

            }else if(query.length === 1){

                return new ElementClass(query[0]);

            }else if(query.length === 0){

                return [];

            }

        }
        
    };

})();

(function(){

    Archer.data = {

        data: {},

        add: function(key, value){

            this.data[key] = value;

            for(i in Archer.data.data){

                var body = Archer.element(document.getElementsByTagName("body")[0]),
                innerHTML = body.html();
        
                innerHTML = innerHTML.replace(new RegExp("{{" + i + "}}", "g"), Archer.data.data[i])
        
                body.html(innerHTML);

            }

        },

        remove: function(key){

            delete this.data[key];

        },

        has: function(key){

            return this.get(key) !== "";

        },

        get: function(key){

            return this.data[key] || "";

        },

    };

})();

(function(){

    document.addEventListener("DOMContentLoaded", function(){

        var all = document.getElementsByTagName("*");

        for(var i = 0; i < all.length; i++){

            if(all[i].hasAttribute("a:click") === true){

                var code = all[i].getAttribute("a:click");

                all[i].addEventListener("click", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

            if(all[i].hasAttribute("a:dblclick") === true){

                var code = all[i].getAttribute("a:dblclick");

                all[i].addEventListener("dblclick", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

            if(all[i].hasAttribute("a:wheel") === true){

                var code = all[i].getAttribute("a:wheel");

                all[i].addEventListener("wheel", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

            if(all[i].hasAttribute("a:blur") === true){

                var code = all[i].getAttribute("a:blur");

                all[i].addEventListener("blur", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

            if(all[i].hasAttribute("a:focus") === true){

                var code = all[i].getAttribute("a:focus");

                all[i].addEventListener("focus", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

            if(all[i].hasAttribute("a:submit") === true){

                var code = all[i].getAttribute("a:submit");

                all[i].addEventListener("submit", function(){

                    eval(code);

                }.bind(Archer.element(all[i])));

            }

        }

    });

})();

(function(){

    Archer.component = function(name, options){

        for(i in Archer.data.data){

            var body = Archer.element(document.getElementsByTagName("body")[0]),
            innerHTML = body.html();

            innerHTML = innerHTML.replace(new RegExp("{{{" + name + "}}}", "g"), options.template.replace(new RegExp("{{" + i + "}}", "g"), Archer.data.data[i]))

            body.html(innerHTML);

        }
    
    };

})();


if(module && module.exports){

    module.exports = Archer;

}else if(typeof define === "function" && define.amd){

    define("archer", function(){

        return Archer;

    });

}else if(window && typeof window === "object"){

    window.Archer = Archer;

}
