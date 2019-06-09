import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
// good width for mobile chart is 333px, ipad is  w=666 h=500, ipad pro is w=999 h=666 , half screen is  666, and fulls screen is w=1300 h=300
const CustomTooltip  = createReactClass({

  render() {
    const { active } = this.props;
    console.log('this.props in tool tip => ', this.props)

    if (active) {
      const { payload, label } = this.props;
      return (
        <div style={customTooltipStyle}>
          <p>Time: {payload[0].payload.time21_5}</p>
          <p>CME Type: {payload[0].payload.type}</p>
          <p>Notes: {payload[0].payload.note}</p>
        </div>
      );
    }

    return null;
  }
});
class SimpleBarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


	render () {
    const { width } = this.props.size
    const { cmeTab } = this.props;
      return (
        cmeTab === 'speed' && width < 400 ?
        <div>
          <BarChart width={333} height={300} data={this.props.data.cmeData}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="speed" fill="#0b3d91" unit="mph" />
          </BarChart>
        </div>
        : cmeTab === 'halfAngle' && width < 400 ?
        <div>
          <BarChart width={333} height={300} data={this.props.data.cmeData}
          margin={{top: 20, right: 60, left: 5, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'degree', angle: -90, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="halfAngle" fill="#0b3d91" unit="&deg;" />
          </BarChart>
        </div>
        :
        cmeTab === 'speed' && width <=800 && width > 400 ?
        <div>
          <BarChart width={350} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
          <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }} />
          <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
          <Legend />
          <Bar dataKey="speed" fill="#0b3d91" unit="mph" />
          </BarChart>
        </div>
        : 
        cmeTab === 'halfAngle' && width <=800 && width > 400 ?
        <div>
          <BarChart width={350} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 60, left: 5, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'degree', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="halfAngle" fill="#0b3d91" unit="&deg;" />
          </BarChart>
        </div>
        :
        cmeTab === 'speed' && width <= 1100 && width > 801 ?
        <div>
          <BarChart width={999} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="speed" fill="#0b3d91" label unit="mph" />
          </BarChart>
        </div>
        :
        cmeTab === 'halfAngle' && width <= 1100 && width > 801 ?
        <div>
          <BarChart width={999} height={450} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'degree', angle: -90, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="halfAngle" fill="#0b3d91" label unit="&deg;" />
          </BarChart>
        </div>
      :
      cmeTab === 'speed' && width > 1100 ?
        <div>
          <BarChart width={1300} height={300} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5}} />
            <YAxis label={{ value: 'mph', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="speed" fill="#0b3d91" label unit="mph" />
          </BarChart>
        </div>
      :
        <div>
          <BarChart width={1300} height={300} data={this.props.data.cmeData}
                margin={{top: 20, right: 30, left: 60, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="type" label={{ value: "CME Type", position: 'insideBottomRight', offset: -5}} />
            <YAxis label={{ value: 'degree', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip/>} payload={this.props.data.cmeData}/>
            <Legend />
            <Bar dataKey="halfAngle" fill="#0b3d91" label unit="&deg;" />
          </BarChart>
        </div>
      );
  }
}

const customTooltipStyle = {
  backgroundColor: 'white',
  padding: '10px',
  opacity: '0.9'
}

const mapStateToProps = state => ({
  cmeTab: state.cmeSelections.cmeTab
});

export default connect(mapStateToProps, null)(SimpleBarChart);