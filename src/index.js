import React, { Component } from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = 'AIzaSyD5Fh5Znv0IWKdYD9QR4t-f0VduCLPac78';  //youtube api key get from google.

class App extends Component {     //class based component.
	constructor(props) {     //constructor function.
		super(props);

		this.state = {     //Defining states of component level.
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('serfboards');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term: term }, (videos) => {     //used youtube-api-search to intract with youtube api.
			this.setState({     
				videos: videos,
				selectedVideo: videos[0]
				});     //setting a value to state.
		});
	}

	render() {      //render function that renders first when searver boots up.
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);     //for throtteling search.

		return (
		<div>
			<SearchBar onSearchTermChange={videoSearch}/>      
			<VideoDetail video={this.state.selectedVideo}/>      
			<VideoList 
			onVideoSelect={selectedVideo => this.setState({selectedVideo})}
			videos={this.state.videos}/>
		</div>
		);
	}
}

ReactDom.render(<App />, document.querySelector('.container'));     //From where rendering starts.