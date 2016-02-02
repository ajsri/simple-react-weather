import React, {Component} from 'react';

const Weather = ({data}) => {
	let icons = {
		'10d': 'wi-raindrop',
		'09d': 'wi-showers',
		'50d': 'wi-sleet'
	}
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	if(!data) {
		return(
			<div>Loading</div>
		)
	}
	else{
		let d = new Date();
		let suffix = '';
		switch(d.getDate() % 10){
			case 1:
				suffix = 'st';
			case 2:
				suffix = 'nd';
			case 3:
				suffix = 'rd';
			default:
				suffix = 'th';
		}
		let colSize = 12 / data.weather.length;
		let fontSize = colSize;
		let date = `${months[d.getMonth()]} ${d.getDate()}${suffix}`;
		let time = `${d.getHours()}:${d.getMinutes()}`
		return(
			<div className='weather text-center'>
				<div>
					<div className='weather-lg'>
						{date} {time}<br/>
						{data.main.temp.toFixed(0)}&deg;F
					</div>
					{data.weather.map((weatherItem, i) => {
						let icon = `wi ${icons[weatherItem.icon]}`;
						let fClass = `text-center col-md-${colSize}`;
						return(
							<div key={i} className={fClass}>
								<div className='weather-badge'>
									<p className={icon} style={{fontSize: fontSize + 'em'}}></p>
									<p className='desc'>{weatherItem.description}</p>
								</div>
							</div>
						)
					})}
					<br/><br/>
					<h1 className='text-center'>{data.name}</h1>
					<div className='text-center'>({data.latitude.toFixed(4)}, {data.longitude.toFixed(4)})</div>
				</div>
			</div>
		)	
	}

}

export default Weather;