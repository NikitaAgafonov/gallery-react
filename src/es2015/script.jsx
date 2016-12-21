const url = "https://api-fotki.yandex.ru/api/top/?format=json";
let pages = [],
	countImgPage = 8;

function getPages(data) {
	let j = 0;
	for(let i=0; i <= (Math.ceil(data.length/countImgPage))-1; i++) {
		pages[i] = [];
		for (let z=0;z<countImgPage;z++) {
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
	dataType: 'jsonp',
}).done(function (data) {
	getPages(data.entries);
	ReactDOM.render(
		<Photos />,
		document.getElementById('main')
		);
});

/* ################################# */

class ImgPhotos extends React.Component {
	constructor () {
		super();
	}
	render () {
		if (!this.props.photo) { 
			return null; 
		} else {
			return <img className="thumbnail imgPhotos"  onClick={this.props.onClick}  src={this.props.photo.img.M.href} />;
		}
	}
}

class ImgSelectedPhoto extends React.Component {
	constructor () {
		super();
	}
	render () {
		if (!this.props.photo) { 
			return null; 
		} else {
			return (
				<div className="popup">
					<div className="popup__content">
						<div className="popup__content_header">
							<div className="popup__content_name">
								{this.props.photo.title}
							</div>
							<div className="popup__content_close">
								<span className="glyphicon glyphicon-remove-sign" onClick={this.props.close}></span>
							</div>
						</div>
						<div className="popup__content_image">
							<img className="left" src="img/left_popup.png" onClick={this.props.prev} />
							<img className="thumbnail" src={this.props.photo.img.XL.href} />
							<img className="right" src="img/right_popup.png"  onClick={this.props.next} />
						</div>
						<div className="popup__content_footer">
							Author: {this.props.photo.author}
						</div>
					</div>
				</div>
			);
		}
	}
}

class Photos extends React.Component {
	constructor () {
		super();
		this.state = {
			page: 0,
			watchPhotos: [],
			selectedPhoto: {},
			selected: false,
			selectedNum: 0
		}
		window.addEventListener('keydown', this.userClick.bind(this));
	}
	userClick(e) {
		if (this.state.selected) {
			if (e.keyCode===37) {this.prevPhoto()};
			if (e.keyCode===39) {this.nextPhoto()};
		} else {
			if (e.keyCode===37) {this.prevPage()};
			if (e.keyCode===39) {this.nextPage()};
		}
	}
	renderImgPhotos(i) {
		return <ImgPhotos page={this.state.page} photo={this.state.watchPhotos[i]} numImg={i} onClick={() => this.selectUserPhoto(i)} />;
	}
	selectUserPhoto(i) {
		this.setState({
			selectedPhoto: this.state.watchPhotos[i],
			selected: true,
			selectedNum: i
		})
	}
	renderImgPhoto() {
		if (this.state.selected) {
			return <ImgSelectedPhoto photo={this.state.selectedPhoto} close={()=>this.closePhoto()} next={()=>this.nextPhoto()} prev={()=>this.prevPhoto()} />;
		} else {
			return null;
		}
	}
	closePhoto() {
		let that = this;
		$('.popup').animate({'opacity':'0'},600,function(){
			that.setState({
				selectedPhoto: {},
				selected: false
			})
			$(this).css("opacity","1");
		});
	}
	nextPhoto() {
		let next = this.state.selectedNum+1;
		if(next>=this.state.watchPhotos.length) {
			this.closePhoto();
			return;
		}
		this.setState({
			selectedPhoto: this.state.watchPhotos[next],
			selectedNum: next
		})
	}
	prevPhoto() {
		let prev = this.state.selectedNum-1;
		if(prev<0) {
			this.closePhoto();
			return;
		}
		this.setState({
			selectedPhoto: this.state.watchPhotos[prev],
			selectedNum: prev
		})
	}
	nextPage () {
		let nextPage = this.state.page+1,
			watchPhotos = [];
		for (let i = 0; i<pages[nextPage].length; i++) {
			watchPhotos.push(pages[nextPage][i]);
		}
		let that = this;
		$('.thumbnail').animate({'opacity':'0'},600,function(){
			that.setState({
				page: nextPage,
				watchPhotos: watchPhotos
			});
			$(this).animate({'opacity':'1'},600);
		});
	}
	prevPage () {
		let prevPage = this.state.page-1,
			watchPhotos = [];
		for (let i = 0; i<pages[prevPage].length; i++) {
			watchPhotos.push(pages[prevPage][i]);
		}
		let that = this;
		$('.thumbnail').animate({'opacity':'0'},600,function(){
			that.setState({
				page: prevPage,
				watchPhotos: watchPhotos
			});
			$(this).animate({'opacity':'1'},600);
		});
	}
	leftArrow () {
		if (this.state.page===0) {
			return (
				<div className="left">
				</div>
			);
		} else {
			return (
				<div className="left">
					<img src="img/left.png" onClick={()=>this.prevPage()}/>
				</div>
			);
		}
	}
	rightArrow () {
		if (this.state.page===6) {
			return (
				<div className="right">
				</div>
			);
		} else {
			return (
				<div className="right" >
					<img src="img/right.png" onClick={()=>this.nextPage()} />
				</div>
			);
		}
	}
	componentWillMount() {
		let watchPhotos = [];
		for (let i = 0; i<pages[this.state.page].length; i++) {
			watchPhotos.push(pages[this.state.page][i]);
		}
		this.setState({
			page: this.state.page,
			watchPhotos: watchPhotos
		});
	}
	render () {
		return (
			<div className="photos">
				{this.leftArrow()}
				<div className="center">
					{this.renderImgPhotos(0)}
					{this.renderImgPhotos(1)}
					{this.renderImgPhotos(2)}
					{this.renderImgPhotos(3)}
					{this.renderImgPhotos(4)}
					{this.renderImgPhotos(5)}
					{this.renderImgPhotos(6)}
					{this.renderImgPhotos(7)}
				</div>
				{this.rightArrow()}
				{this.renderImgPhoto()}
			</div>

		);
	}
}
