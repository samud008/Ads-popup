<script type="text/javascript" >
var Light = Light || {};
Light.Popup = {
    popName: 'Chip-LightPopup',
    alwaysPop: false, // refresh = new pop
    onNewTab: true,
    /**
     * 1: window onclick,
     * 2: window onload -> document onclick
     */
    eventType: 1,
    defaults: {
        width: window.screen.width,
        height: window.screen.height,
        left: 700,
        top: 0,
        location: 1,
        toolbar: 1,
        status: 1,
        menubar: 1,
        scrollbars: 1,
        resizable: 1
    },
    newWindowDefaults: {
        width: window.screen.width - 20,
        height: window.screen.height - 20
    },
    __newWindow: {
        scrollbars: 0
    },
    __counter: 0,
    // Liste de classes à exclure, séparées par des virgules
    classesAExclure: "kofi-button,kofitext,kofiimg,btn-container,comments-area,comment-respond,comment-reply-title,comment-form,comment-form-comment,normal,form-submit,submit,comment-reply-link,telbtn,telp,form-label,fullwidth,comment-form-cookies-consent,bg-box,share-btn,text-share-btn,share-items,fab,search-button,search_responsive,fas,fa-search,search_page_form,search-page,se-c,se-q,se-t,se-o,title,pum-close,popmake-close,pum-content,popmake-content,report-video-checkbox,close-modal-report,report-title,dooplay-report-form",
    // Liste d'IDs à exclure, séparés par des virgules
    idsAExclure: "wp-comment-cookies-consent,Layer_1,searchform,s,form-search-resp,ms,popmake-10871,pum_popup_title",
    create: function (link, options) {
        var optionsOriginal = options = options || {},
            me = this;
        var popName = me.popName + '_' + (me.__counter++);
        var keys = ['onNewTab', 'eventType', 'cookieExpires', 'alwaysPop'];
        for (var i in keys) {
            var key = keys[i];
            if (typeof options[key] != 'undefined') {
                eval('var ' + key + ' = options.' + key);
                delete options[key];
            } else {
                eval('var ' + key + ' = me.' + key);
            }
        }
        if (alwaysPop) {
            cookieExpires = -1;
        }
        for (var i in me.defaults) {
            if (typeof options[i] == 'undefined') {
                options[i] = me.defaults[i];
                if (!onNewTab && typeof me.newWindowDefaults[i] != 'undefined') {
                    options[i] = me.newWindowDefaults[i];
                }
            }
        }
        for (var i in me.__newWindow) {
            options[i] = me.__newWindow[i];
        }
        var params = [];
        for (var i in options) {
            params.push(i + '=' + options[i]);
        }
        params = params.join(',');
        var executed = false;
        var execute = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            // Vérifie si l'élément cliqué a l'une des classes à exclure
            if (target.classList) {
                var classesExclues = me.classesAExclure.split(",");
                for (var i = 0; i < classesExclues.length; i++) {
                    if (target.classList.contains(classesExclues[i]) || /\bclassesExclues[i]\b/.test(target.className)) {
                        return; // Ne fait rien si l'élément a l'une des classes à exclure
                    }
                }
            }

            // Vérifie si l'élément cliqué a la classe 'no-popup' ou une classe contenant 'no-popup'
            if (target.classList && (target.classList.contains('no-popup') || /\bno-popup\b/.test(target.className))) {
                return; // Ne fait rien si l'élément a la classe 'no-popup'
            }

            // Vérifie si l'élément cliqué a l'un des IDs à exclure
            if (target.id) {
                var idsExclus = me.idsAExclure.split(",");
                for (var i = 0; i < idsExclus.length; i++) {
                    if (target.id === idsExclus[i]) {
                        return; // Ne fait rien si l'élément a l'un des IDs à exclure
                    }
                }
            }

            if (me.cookie(popName) === null && !executed) {
                // Jul 5, 2013 - Anti Google Chrome Blocker
                if (typeof window.chrome != 'undefined' && navigator.userAgent.indexOf('Windows') != -1
                    && typeof ___lastPopTime != 'undefined' && ___lastPopTime + 5 > new Date().getTime()) {
                    return;
                }
                executed = true;
                if (onNewTab) {
                    var w = window.open(link, popName);
                } else {
                    var w = window.open(link, '_blank', params);
                }
                w && w.blur(); // "w" may null on IE
                window.focus();
                me.cookie(popName, 1, cookieExpires);
                // Jul 5, 2013 - Anti Google Chrome Blocker
                ___lastPopTime = new Date().getTime();
                if (navigator.userAgent.indexOf('Mac OS') != -1 && typeof window.chrome != 'undefined') {
                    setTimeout(function () {
                        if (!w.innerWidth || !w.document.documentElement.clientWidth) {
                            me.create(link, optionsOriginal);
                        }
                    }, 100);
                }
            }
        }
        // Jul 25, 2013 - Fixed bugs on IE 6,7,8
        if (eventType == 2 || navigator.userAgent.match(/msie\s+(6|7|8)/i)) {
            if (!window.addEventListener) {
                window.attachEvent("onload", function () {
                    document.body.attachEvent("onclick", execute);
                });
            } else {
                window.addEventListener("load", function () {
                    document.body.addEventListener("click", execute);
                });
            }
        }
        else if (eventType == 1) {
            if (!window.addEventListener) {
                window.attachEvent("onclick", execute);
            } else {
                window.addEventListener("click", execute);
            }
        }
    },
    cookie: function (name, value, seconds) {
        if (arguments.length === 1) {
            var cookieMatch = document.cookie.match(new RegExp(name + "=[^;]+", "i"));
            return cookieMatch ? decodeURIComponent(cookieMatch[0].split("=")[1]) : null;
        }

        var expires = '';
        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds * 1000));
            expires = '; expires=' + date.toUTCString();
        }

        var value = escape(value) + expires + "; path=/";
        document.cookie = name + "=" + value;
    }
};
</script>


<script type="text/javascript" >
// make pop on new tab | monetag https://noohapou.com/4/5694554
Light.Popup.create('https://obqj2.com/4/5694554', {onNewTab: true, cookieExpires: 100}); 

</script>
