'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var url = "https://api-fotki.yandex.ru/api/top/?format=json";
var pages = [],
    countImgPage = 8;

function getPages(data) {
	var j = 0;
	for (var i = 0; i <= Math.ceil(data.length / countImgPage) - 1; i++) {
		pages[i] = [];
		for (var z = 0; z < countImgPage; z++) {
			if (data[j]) {
				pages[i].push(data[j]);
			} else {
				break;
			}
			j++;
		}
	}
}

/* ########## START APP ############ */

jQuery.ajax({
	url: url,
	crossDomain: true,
	contentType: 'application/json',
	dataType: 'jsonp'
}).done(function (data) {
	getPages(data.entries);
	ReactDOM.render(React.createElement(Photos, null), document.getElementById('main'));
});

/* ################################# */

var ImgPhotos = function (_React$Component) {
	_inherits(ImgPhotos, _React$Component);

	function ImgPhotos() {
		_classCallCheck(this, ImgPhotos);

		return _possibleConstructorReturn(this, (ImgPhotos.__proto__ || Object.getPrototypeOf(ImgPhotos)).call(this));
	}

	_createClass(ImgPhotos, [{
		key: 'render',
		value: function render() {
			if (!this.props.photo) {
				return null;
			} else {
				return React.createElement('img', { className: 'thumbnail imgPhotos', onClick: this.props.onClick, src: this.props.photo.img.M.href });
			}
		}
	}]);

	return ImgPhotos;
}(React.Component);

var ImgSelectedPhoto = function (_React$Component2) {
	_inherits(ImgSelectedPhoto, _React$Component2);

	function ImgSelectedPhoto() {
		_classCallCheck(this, ImgSelectedPhoto);

		return _possibleConstructorReturn(this, (ImgSelectedPhoto.__proto__ || Object.getPrototypeOf(ImgSelectedPhoto)).call(this));
	}

	_createClass(ImgSelectedPhoto, [{
		key: 'render',
		value: function render() {
			if (!this.props.photo) {
				return null;
			} else {
				return React.createElement(
					'div',
					{ className: 'popup' },
					React.createElement(
						'div',
						{ className: 'popup__content' },
						React.createElement(
							'div',
							{ className: 'popup__content_header' },
							React.createElement(
								'div',
								{ className: 'popup__content_name' },
								this.props.photo.title
							),
							React.createElement(
								'div',
								{ className: 'popup__content_close' },
								React.createElement('span', { className: 'glyphicon glyphicon-remove-sign', onClick: this.props.close })
							)
						),
						React.createElement(
							'div',
							{ className: 'popup__content_image' },
							React.createElement('img', { className: 'left', src: 'img/left_popup.png', onClick: this.props.prev }),
							React.createElement('img', { className: 'thumbnail', src: this.props.photo.img.XL.href }),
							React.createElement('img', { className: 'right', src: 'img/right_popup.png', onClick: this.props.next })
						),
						React.createElement(
							'div',
							{ className: 'popup__content_footer' },
							'Author: ',
							this.props.photo.author
						)
					)
				);
			}
		}
	}]);

	return ImgSelectedPhoto;
}(React.Component);

var Photos = function (_React$Component3) {
	_inherits(Photos, _React$Component3);

	function Photos() {
		_classCallCheck(this, Photos);

		var _this3 = _possibleConstructorReturn(this, (Photos.__proto__ || Object.getPrototypeOf(Photos)).call(this));

		_this3.state = {
			page: 0,
			watchPhotos: [],
			selectedPhoto: {},
			selected: false,
			selectedNum: 0
		};
		window.addEventListener('keydown', _this3.userClick.bind(_this3));
		return _this3;
	}

	_createClass(Photos, [{
		key: 'userClick',
		value: function userClick(e) {
			if (this.state.selected) {
				if (e.keyCode === 37) {
					this.prevPhoto();
				};
				if (e.keyCode === 39) {
					this.nextPhoto();
				};
			} else {
				if (e.keyCode === 37) {
					this.prevPage();
				};
				if (e.keyCode === 39) {
					this.nextPage();
				};
			}
		}
	}, {
		key: 'renderImgPhotos',
		value: function renderImgPhotos(i) {
			var _this4 = this;

			return React.createElement(ImgPhotos, { page: this.state.page, photo: this.state.watchPhotos[i], numImg: i, onClick: function onClick() {
					return _this4.selectUserPhoto(i);
				} });
		}
	}, {
		key: 'selectUserPhoto',
		value: function selectUserPhoto(i) {
			this.setState({
				selectedPhoto: this.state.watchPhotos[i],
				selected: true,
				selectedNum: i
			});
		}
	}, {
		key: 'renderImgPhoto',
		value: function renderImgPhoto() {
			var _this5 = this;

			if (this.state.selected) {
				return React.createElement(ImgSelectedPhoto, { photo: this.state.selectedPhoto, close: function close() {
						return _this5.closePhoto();
					}, next: function next() {
						return _this5.nextPhoto();
					}, prev: function prev() {
						return _this5.prevPhoto();
					} });
			} else {
				return null;
			}
		}
	}, {
		key: 'closePhoto',
		value: function closePhoto() {
			var that = this;
			$('.popup').animate({ 'opacity': '0' }, 600, function () {
				that.setState({
					selectedPhoto: {},
					selected: false
				});
				$(this).css("opacity", "1");
			});
		}
	}, {
		key: 'nextPhoto',
		value: function nextPhoto() {
			var next = this.state.selectedNum + 1;
			if (next >= this.state.watchPhotos.length) {
				this.closePhoto();
				return;
			}
			this.setState({
				selectedPhoto: this.state.watchPhotos[next],
				selectedNum: next
			});
		}
	}, {
		key: 'prevPhoto',
		value: function prevPhoto() {
			var prev = this.state.selectedNum - 1;
			if (prev < 0) {
				this.closePhoto();
				return;
			}
			this.setState({
				selectedPhoto: this.state.watchPhotos[prev],
				selectedNum: prev
			});
		}
	}, {
		key: 'nextPage',
		value: function nextPage() {
			var nextPage = this.state.page + 1,
			    watchPhotos = [];
			for (var i = 0; i < pages[nextPage].length; i++) {
				watchPhotos.push(pages[nextPage][i]);
			}
			var that = this;
			$('.thumbnail').animate({ 'opacity': '0' }, 600, function () {
				that.setState({
					page: nextPage,
					watchPhotos: watchPhotos
				});
				$(this).animate({ 'opacity': '1' }, 600);
			});
		}
	}, {
		key: 'prevPage',
		value: function prevPage() {
			var prevPage = this.state.page - 1,
			    watchPhotos = [];
			for (var i = 0; i < pages[prevPage].length; i++) {
				watchPhotos.push(pages[prevPage][i]);
			}
			var that = this;
			$('.thumbnail').animate({ 'opacity': '0' }, 600, function () {
				that.setState({
					page: prevPage,
					watchPhotos: watchPhotos
				});
				$(this).animate({ 'opacity': '1' }, 600);
			});
		}
	}, {
		key: 'leftArrow',
		value: function leftArrow() {
			var _this6 = this;

			if (this.state.page === 0) {
				return React.createElement('div', { className: 'left' });
			} else {
				return React.createElement(
					'div',
					{ className: 'left' },
					React.createElement('img', { src: 'img/left.png', onClick: function onClick() {
							return _this6.prevPage();
						} })
				);
			}
		}
	}, {
		key: 'rightArrow',
		value: function rightArrow() {
			var _this7 = this;

			if (this.state.page === 6) {
				return React.createElement('div', { className: 'right' });
			} else {
				return React.createElement(
					'div',
					{ className: 'right' },
					React.createElement('img', { src: 'img/right.png', onClick: function onClick() {
							return _this7.nextPage();
						} })
				);
			}
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var watchPhotos = [];
			for (var i = 0; i < pages[this.state.page].length; i++) {
				watchPhotos.push(pages[this.state.page][i]);
			}
			this.setState({
				page: this.state.page,
				watchPhotos: watchPhotos
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'photos' },
				this.leftArrow(),
				React.createElement(
					'div',
					{ className: 'center' },
					this.renderImgPhotos(0),
					this.renderImgPhotos(1),
					this.renderImgPhotos(2),
					this.renderImgPhotos(3),
					this.renderImgPhotos(4),
					this.renderImgPhotos(5),
					this.renderImgPhotos(6),
					this.renderImgPhotos(7)
				),
				this.rightArrow(),
				this.renderImgPhoto()
			);
		}
	}]);

	return Photos;
}(React.Component);