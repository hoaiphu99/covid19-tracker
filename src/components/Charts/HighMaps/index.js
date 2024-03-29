import React, { useState, useEffect, useRef } from 'react'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map'
import HighCharts from 'highcharts'
import { cloneDeep } from 'lodash'

// load highcharts module
highchartsMap(HighCharts)

const initOptions = {
  chart: {
    height: '500',
  },
  title: {
    text: null,
  },
  mapNavigation: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
    stops: [
      [0.2, '#FFC4AA'],
      [0.4, '#FF8A66'],
      [0.6, '#FF392B'],
      [0.8, '#B71525'],
      [1, '	#7A0826'],
    ],
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'bottom',
  },
  series: [
    {
      mapData: {},
      name: 'Dân số',
      joinBy: ['hc-key', 'key'],
    },
  ],
}

const HighMaps = ({ mapData }) => {
  const [options, setOptions] = useState({})
  const chartRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mapData && Object.keys(mapData).length) {
      const fakeData = mapData.features.map((feature, index) => ({
        key: feature.properties['hc-key'],
        value: index,
      }))
      setOptions({
        ...initOptions,
        series: [
          {
            ...initOptions.series[0],
            mapData: mapData,
            data: fakeData,
          },
        ],
      })
      if (!loading) setLoading(true)
    }
  }, [mapData, loading])

  useEffect(() => {
    if (chartRef && chartRef.current) {
      chartRef.current.chart.series[0].update({
        mapData,
      })
    }
  }, [mapData])

  return (
    <>
      {loading && (
        <HighchartsReact
          highcharts={HighCharts}
          options={cloneDeep(options)}
          constructorType={'mapChart'}
          ref={chartRef}
        />
      )}
    </>
  )
}

export default React.memo(HighMaps)
