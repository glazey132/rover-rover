import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

class LatLongScatterChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { width } = this.props.size
        return (
            width < 400 ?
            <div>
            <ScatterChart width={333} height={300} data={this.props.data.cmeData}
                    margin={{top: 20, right: 60, left: 5, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={'latitude'} type="number" name='latitude' unit="&deg;" label={{ value: "Latitude", position: 'insideBottomRight', offset: -5 }} />
                <YAxis dataKey={'longitude'} type="number" name='longitude' unit="&deg;" label={{ value: 'Longitude', angle: -90, position: 'insideLeft' }}/>
                <Scatter name='CME lat/lon' data={this.props.data.cmeData} fill='#8884d8'/>
                <Tooltip payload={this.props.data.cmeData}/>
                <Legend />
            </ScatterChart>
            </div>
            :
            width <=800 && width > 400 ?
            <div>
            <ScatterChart width={350} height={450} data={this.props.data.cmeData}
                    margin={{top: 20, right: 60, left: 5, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={'latitude'} type="number" name='latitude' unit="&deg;" label={{ value: "Latitude", position: 'insideBottomRight', offset: -5 }} />
                <YAxis dataKey={'longitude'} type="number" name='longitude' unit="&deg;" label={{ value: 'Longitude', angle: -90, position: 'insideLeft' }} />
                <Scatter name='CME lat/lon' data={this.props.data.cmeData} fill='#8884d8'/>
                <Tooltip payload={this.props.data.cmeData}/>
                <Legend />
            </ScatterChart>
            </div>
            :
            width <= 1100 && width > 801 ?
            <div>
            <ScatterChart width={999} height={450} data={this.props.data.cmeData}
                    margin={{top: 20, right: 30, left: 60, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={'latitude'} type="number" name='latitude' unit="&deg;" label={{ value: "Latitude", position: 'insideBottomRight', offset: -5 }} />
                <YAxis dataKey={'longitude'} type="number" name='longitude' unit="&deg;" label={{ value: 'Longitude', angle: -90, position: 'insideLeft' }}/>
                <Scatter name='CME lat/lon' data={this.props.data.cmeData} fill='#8884d8'/>
                <Tooltip payload={this.props.data.cmeData}/>
                <Legend />
            </ScatterChart>
            </div>
            :
            <div>
            <ScatterChart width={1300} height={300} data={this.props.data.cmeData}
                    margin={{top: 20, right: 30, left: 60, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={'latitude'} type="number" name='latitude' unit="&deg;" label={{ value: "Latitude", position: 'insideBottomRight', offset: -5 }} />
                <YAxis dataKey={'longitude'} type="number" name='longitude' unit="&deg;" label={{ value: 'Longitude', angle: -90, position: 'insideLeft' }} />
                <Scatter name='CME lat/lon' data={this.props.data.cmeData} fill='#8884d8'/>
                <Tooltip payload={this.props.data.cmeData}/>
                <Legend />
            </ScatterChart>
            </div>
        );
    }
}

export default LatLongScatterChart;