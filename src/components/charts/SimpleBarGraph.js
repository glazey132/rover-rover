import React from 'react';
import moment from 'moment';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
// good width for mobile chart is 333px, ipad is  w=666 h=500, ipad pro is w=999 h=666 , half screen is  666, and fulls screen is w=1300 h=300
class SimpleBarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


	render () {
    const { width } = this.props.size
    if (width < 400) {
      return (
        <div>
          <BarChart width={333} height={300} data={this.props.data.cmeData}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }}/>
          <Tooltip payload={this.props.data.cmeData}/>
          <Legend />
          <Bar dataKey="speed" fill="#0b3d91" unit="mph" />
          </BarChart>
        </div>
      );
    } else if (width <= 800 && width > 400) {
      return (
        <div>
          <BarChart width={350} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }} />
          <Tooltip payload={this.props.data.cmeData}/>
          <Legend />
          <Bar dataKey="speed" fill="#0b3d91" unit="mph" />
          </BarChart>
        </div>
      );
    } else if (width <= 1100 && width > 801) {
      return (
        <div>
          <BarChart width={999} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }}/>
          <Tooltip payload={this.props.data.cmeData}/>
          <Legend />
          <Bar dataKey="speed" fill="#0b3d91" label unit="mph" />
          </BarChart>
        </div>
      );
    } else {
      return (
        <div>
          <BarChart width={1300} height={300} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5}} />
          <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }} />
          <Tooltip payload={this.props.data.cmeData}/>
          <Legend />
          <Bar dataKey="speed" fill="#0b3d91" label unit="mph" />
          </BarChart>
        </div>
      );
    }
  	
  }
}

export default SimpleBarChart;