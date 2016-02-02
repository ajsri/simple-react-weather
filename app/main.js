import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Input, Button} from 'react-bootstrap';
import Weather from './Weather';
import axios from 'axios';

class Playground extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: 'Enter something below to get started',
			data: {
				main: {
					grnd_level: 991.87,
					humidity: 97,
					pressure: 991.87,
					sea_level: 1014.13,
					temp: 54,
					temp_max: 53.81,
					temp_min: 53.81
				},
				latitude: 38.628319999999995,
				longitude: -90.2257188,
				name: 'Maplehood',
				weather: [
					{
						description: "light rain",
						icon: "10d",
						id: 500,
						main: "Rain"
					}
				]
			}
		}
	}
	componentDidMount(){
		this.getWeather();
	}

	handleUpdate(e){
		this.setState({value: e.target.value});
	}

	getWeather(zip){
		const API_KEY = '2d9e5e47c9c24ed5911dfe341470f4c4';
		const API_URL = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139'
		navigator.geolocation.getCurrentPosition((position) => {
			let {longitude, latitude} = position.coords;
			axios.get(API_URL, {
				params: {
					zip: '63143',
					units: 'imperial',
					appid: API_KEY
				}
			})
			.then((res) => {
				let data = res.data;
				this.setState({
					data: {
						name: data.name,
						main: data.main,
						weather: data.weather,
						longitude: longitude,
						latitude: latitude
					}
				})
			})
			.catch((err) => {
				console.log(err);
			});
		});
	}

	render(){
		return(
			<Grid>
				<Row>
					<Col sm={4} smPush={4} xs={12}>
						<Weather data={this.state.data} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

ReactDOM.render(<Playground />, document.getElementById('root'));