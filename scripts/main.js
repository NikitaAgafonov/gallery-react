"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function getPages(e){for(var t=0,s=0;s<=Math.ceil(e.length/countImgPage)-1;s++){pages[s]=[];for(var o=0;o<countImgPage&&e[t];o++)pages[s].push(e[t]),t++}}var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var o=t[s];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,s,o){return s&&e(t.prototype,s),o&&e(t,o),t}}(),url="https://api-fotki.yandex.ru/api/top/?format=json",countImgPage=8,speedAnim=600,pages=[];jQuery.ajax({url:url,crossDomain:!0,contentType:"application/json",dataType:"jsonp"}).done(function(e){getPages(e.entries),ReactDOM.render(React.createElement(Photos,null),document.getElementById("main"))}).fail(function(e){throw e.status+": "+e.statusText});var ImgPhotos=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){return this.props.photo?React.createElement("img",{className:"thumbnail imgPhotos",onClick:this.props.onClick,src:this.props.photo.img.M.href}):null}}]),t}(React.Component),ImgSelectedPhoto=function(e){function t(e){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return _inherits(t,e),_createClass(t,[{key:"render",value:function(){if(this.props.photo){var e={opacity:this.props.havePrev},t={opacity:this.props.haveNext};return React.createElement("div",{className:"popup",onClick:this.props.close},React.createElement("div",{className:"popup__content"},React.createElement("div",{className:"popup__content_header"},React.createElement("div",{className:"popup__content_name"},this.props.photo.title),React.createElement("div",{className:"popup__content_close"},React.createElement("img",{src:"./img/close.png",className:"popup__content_closeImg",alt:""}))),React.createElement("div",{className:"popup__content_image"},React.createElement("img",{className:"left",src:"img/left_popup.png",style:e,onClick:this.props.prev}),React.createElement("div",{className:"center"},React.createElement("img",{className:"thumbnail",src:this.props.photo.img.XL.href})),React.createElement("img",{className:"right",src:"img/right_popup.png",style:t,onClick:this.props.next})),React.createElement("div",{className:"popup__content_footer"},"Author: ",this.props.photo.author)))}return null}}]),t}(React.Component),Photos=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={page:0,watchPhotos:[],selectedPhoto:{},selected:!1,selectedNum:0},e.haveNext=1,e.havePrev=1,window.addEventListener("keydown",e.userClick.bind(e)),e}return _inherits(t,e),_createClass(t,[{key:"userClick",value:function(e){this.state.selected?(37===e.keyCode&&this.prevPhoto(),39===e.keyCode&&this.nextPhoto()):(37===e.keyCode&&0!==this.state.page&&this.prevPage(),39===e.keyCode&&pages.length-1>this.state.page&&this.nextPage())}},{key:"renderImgPhotos",value:function(e){var t=this;return React.createElement(ImgPhotos,{page:this.state.page,photo:this.state.watchPhotos[e],numImg:e,onClick:function(){return t.selectUserPhoto(e)}})}},{key:"selectUserPhoto",value:function(e){this.havePrev=0===e?0:1,this.haveNext=e===pages[this.state.page].length-1?0:1,this.setState({selectedPhoto:this.state.watchPhotos[e],selected:!0,selectedNum:e})}},{key:"renderImgPhoto",value:function(){var e=this;return this.state.selected?React.createElement(ImgSelectedPhoto,{photo:this.state.selectedPhoto,close:function(t){return e.clickClosePhoto(t)},next:function(){return e.nextPhoto()},prev:function(){return e.prevPhoto()},haveNext:this.haveNext,havePrev:this.havePrev}):null}},{key:"closePhoto",value:function(){var e=this;$(".popup").animate({opacity:"0"},speedAnim,function(){e.setState({selectedPhoto:{},selected:!1}),$(this).css("opacity","1")})}},{key:"clickClosePhoto",value:function(e){e&&("popup__content_closeImg"!==e.target.className&&"popup"!==e.target.className||this.closePhoto())}},{key:"nextPhoto",value:function(){var e=this.state.selectedNum+1;e===pages[this.state.page].length-1&&(this.haveNext=0),e>this.state.watchPhotos.length-1?this.closePhoto():(this.havePrev=1,this.setState({selectedPhoto:this.state.watchPhotos[e],selectedNum:e}))}},{key:"prevPhoto",value:function(){var e=this.state.selectedNum-1;0===e&&(this.havePrev=0),e<0?this.closePhoto():(this.haveNext=1,this.setState({selectedPhoto:this.state.watchPhotos[e],selectedNum:e}))}},{key:"nextPage",value:function e(){for(var e=pages.length===this.state.page+1?pages.length:this.state.page+1,t=[],s=this,o=0;o<pages[e].length;o++)t.push(pages[e][o]);$(".center").animate({opacity:"0"},speedAnim,function(){s.setState({page:e,watchPhotos:t}),$(this).animate({opacity:"1"},speedAnim)})}},{key:"prevPage",value:function e(){for(var e=0===this.state.page?0:this.state.page-1,t=[],s=this,o=0;o<pages[e].length;o++)t.push(pages[e][o]);$(".center").animate({opacity:"0"},speedAnim,function(){s.setState({page:e,watchPhotos:t}),$(this).animate({opacity:"1"},speedAnim)})}},{key:"leftArrow",value:function(){var e=this;return 0===this.state.page?React.createElement("div",{className:"left"}):React.createElement("div",{className:"left"},React.createElement("img",{src:"img/left.png",onClick:function(){return e.prevPage()}}))}},{key:"rightArrow",value:function(){var e=this;return 6===this.state.page?React.createElement("div",{className:"right"}):React.createElement("div",{className:"right"},React.createElement("img",{src:"img/right.png",onClick:function(){return e.nextPage()}}))}},{key:"componentWillMount",value:function(){for(var e=[],t=0;t<pages[this.state.page].length;t++)e.push(pages[this.state.page][t]);this.setState({page:this.state.page,watchPhotos:e})}},{key:"render",value:function(){return React.createElement("div",{className:"photos"},this.leftArrow(),React.createElement("div",{className:"center"},this.renderImgPhotos(0),this.renderImgPhotos(1),this.renderImgPhotos(2),this.renderImgPhotos(3),this.renderImgPhotos(4),this.renderImgPhotos(5),this.renderImgPhotos(6),this.renderImgPhotos(7)),this.rightArrow(),this.renderImgPhoto())}}]),t}(React.Component);