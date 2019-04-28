import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const data = [
      {name: 'C', speed: 506, halfangle: 22, latitude: 3, longitude: -124},
      {name: 'S', speed: 318, halfangle: 12, latitude: -5, longitude: -44},
      {name: 'S', speed: 428, halfangle: 22, latitude: 1, longitude: -149},
      {name: 'S', speed: 387, halfangle: 30, latitude: 2, longitude: 90},
      {name: 'S', speed: 367, halfangle: 27, latitude: 11, longitude: 117},
      {name: 'S', speed: 434, halfangle: 26, latitude: 9, longitude: 87},
];
// good width for mobile chart is 333px, ipad is  w=666 h=500, ipad pro is w=999 h=666 , half screen is  666, and fulls screen is w=1300 h=300
class SimpleBarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

	render () {
    const { width } = this.props.size
    console.log('the props in bar grph => ', this.props)
    if (width < 400) {
      return (
        <div>
          <BarChart width={333} height={300} data={data}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="speed" fill="#fc3d21" />
          <Bar dataKey="halfangle" fill="#0b3d91" />
          <Bar dataKey="latitude" fill="#beab40" />
          <Bar dataKey="longitude" fill="#45a0a5" />
          </BarChart>
        </div>
      );
    } else if (width <= 800 && width > 400) {
      return (
        <div>
          <BarChart width={666} height={450} data={data}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="speed" fill="#fc3d21" />
          <Bar dataKey="halfangle" fill="#0b3d91" />
          <Bar dataKey="latitude" fill="#beab40" />
          <Bar dataKey="longitude" fill="#45a0a5" />
          </BarChart>
        </div>
      );
    } else if (width <= 1100 && width > 801) {
      return (
        <div>
          <BarChart width={999} height={450} data={data}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="speed" fill="#fc3d21" />
          <Bar dataKey="halfangle" fill="#0b3d91" />
          <Bar dataKey="latitude" fill="#beab40" />
          <Bar dataKey="longitude" fill="#45a0a5" />
          </BarChart>
        </div>
      );
    } else {
      return (
        <div>
          <BarChart width={1300} height={300} data={data}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="speed" fill="#fc3d21" />
          <Bar dataKey="halfangle" fill="#0b3d91" />
          <Bar dataKey="latitude" fill="#beab40" />
          <Bar dataKey="longitude" fill="#45a0a5" />
          </BarChart>
        </div>
      );
    }
  	
  }
}

export default SimpleBarChart;