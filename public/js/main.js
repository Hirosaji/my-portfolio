const infoPosition = document.querySelector("#info").offsetTop;
const workPosition = document.querySelector("#work").offsetTop;
const infoLink = document.querySelectorAll(".info-link");
const workLink = document.querySelectorAll(".work-link");

const forms = document.querySelectorAll(".form-element");

const ids = document.querySelectorAll("[data-id]");
const imgs = document.querySelectorAll("[data-nr]");

const ja = document.querySelector("[data-ja]");
const en = document.querySelector("[data-en]");

const scrollToTopBtns = [...document.querySelectorAll('.scrollToTop')];


function scrollToTop() {
    window.scroll(0, 0);
}

const language = {
    ja: {
        name: "ひろさじ",
        illustrator: "illustrator",
        figcaptions: {
            1: "",
            2: ""
        },
        work: "Works",
        info: "Profile",
        infoText: "新米の社会人イラストレーターです。<br>女の子を主体としたイラストが得意です。絵柄は、リアルもデフォルメも描きます。背景には、実在する静物や舞台をセルルックに描くことが多いです。また、本業がWebエンジニアですので、Webに最適な形式やデザインのイラスト素材を提案することも可能です。",
        infoFormTouch: "お問い合わせ・ご依頼フォーム",
        infoFormText: "イラスト制作などのお問い合わせ・ご依頼は、次の専用フォームにて承っております。",
        infoContactTouch: "連絡先",
        infoContactText: "ご連絡は専用フォーム以外でも受け付けています。お気軽にご相談ください！"
    },
    en: {
        name: "Hirosaji",
        illustrator: "illustrator",
        figcaptions: {
            1: "",
            2: ""
        },
        work: "Works",
        info: "Profile",
        infoText: "I am a newbie illustrator.<br>I specialize in illustrations, mainly of girls. I can draw both realistic and deformed characters. My background illustrations tend to be of real-life still life and stages, and my style can be both rustic and photorealistic. Also, since my day job is a web engineer, I can prepare the best illustration material for the web.",
        infoFormTouch: "Inquiry / request form (in Japanese)",
        infoFormText: "If you can read Japanese, and have any questions or requests, please contact us using the following the form.",
        infoContactTouch: "Get in touch",
        infoContactText: "I’m looking forward to working together!"
    }
};


let translateToJA = () =>  {
    imgs.forEach((fig) => {
        let dataNr = fig.dataset.nr;
        fig.innerHTML = language.ja.figcaptions[dataNr];
    })

    ids.forEach((el) => {
        let dataId = el.dataset.id;
        el.innerHTML = language.ja[dataId];
    })

    forms.forEach((el) => {
        el.style.display='block';
    })
};
let translateToEn  = () =>   {
    imgs.forEach((fig) => {
        let dataNr = fig.dataset.nr;
        fig.innerHTML = language.en.figcaptions[dataNr];
    })

    ids.forEach((el) => {
        let dataId = el.dataset.id;
    
        el.innerHTML = language.en[dataId];
    })

    forms.forEach((el) => {
        el.style.display='none';
    })
};




///----------  EVENT LISTENERS  -----------///

ja.addEventListener('click', translateToJA);
en.addEventListener('click', translateToEn);

scrollToTopBtns.forEach((btn) => btn.addEventListener('click', scrollToTop));

const addClassOnScroll = window.addEventListener("scroll", () => {
    let windowPosition = window.scrollY;
    let threshold = 100;
    
    if (windowPosition > workPosition && windowPosition  < infoPosition) {
        workLink.forEach(el => el.classList.add("active"));
        infoLink.forEach(el => el.classList.remove("active"));
    }

    if(windowPosition >= infoPosition - threshold) {
        workLink.forEach(el => el.classList.remove("active"));
        infoLink.forEach(el => el.classList.add("active"));
    }
}, false)

const showOnScroll = window.addEventListener("scroll",function(){
    var h = window.innerHeight - 20;
    var target = document.querySelectorAll('.showOnScroll');

    target.forEach((item) => {
        if(window.pageYOffset > h){
            item.style.opacity = "1"; 
           }
           else if(window.pageYOffset < h){
             item.style.opacity = "0";
           }
       
           if(window.pageYOffset > h - 25) {
               item.style.display = ""
           } else if (window.pageYOffset < h - 25) {
               item.style.display = "none";
           }
        })
    }, false);


    ///----------  PHOTOSWIPE  -----------///

    var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');