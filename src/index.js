
import { SciChartSurface } from "scichart/charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/charting/Visuals/Axis/NumericAxis";
import { FastLineRenderableSeries } from "scichart/charting/visuals/RenderableSeries/FastLineRenderableSeries";
import { XyDataSeries } from "scichart/charting/Model/XyDataSeries";
// import { BoxAnnotation } from "scichart/Charting/Visuals/Annotations/BoxAnnotation";
import { TextAnnotation } from "scichart/Charting/Visuals/Annotations/TextAnnotation";
import { MouseWheelZoomModifier } from "scichart/charting/ChartModifiers/MouseWheelZoomModifier";
import { RubberBandXyZoomModifier } from "scichart/charting/ChartModifiers/RubberBandXyZoomModifier";
import { ZoomExtentsModifier } from "scichart/charting/ChartModifiers/ZoomExtentsModifier";
import { ZoomPanModifier } from "scichart/charting/ChartModifiers/ZoomPanModifier";
import { RolloverModifier } from "scichart/charting/ChartModifiers/RolloverModifier";
import { NumberRange } from "scichart/Core/NumberRange";
import { EHorizontalAnchorPoint, EVerticalAnchorPoint } from "scichart/types/AnchorPoint";
import { data } from './data';
async function initSciChart() {
  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.
  const { sciChartSurface, wasmContext } = await SciChartSurface.create("scichart-root");
  // Create an X,Y Axis and add to the chart


  const xAxis = new NumericAxis(wasmContext);
  // xAxis.visibleRange = new NumberRange(0, 7000);
  sciChartSurface.xAxes.add(xAxis);
  const yAxis = new NumericAxis(wasmContext);
  // yAxis.visibleRange = new NumberRange(0, 6);
  sciChartSurface.yAxes.add(yAxis);

  yAxis.axisAlignmentProperty = "None";


  const mouseWheelZoomModifier = new MouseWheelZoomModifier();
  const zoomPanModifier = new ZoomPanModifier();
  const rubberBandZoomModifier = new RubberBandXyZoomModifier();
  const zoomExtentsModifier = new ZoomExtentsModifier();
  sciChartSurface.chartModifiers.add(zoomExtentsModifier);
  sciChartSurface.chartModifiers.add(zoomPanModifier);
  sciChartSurface.chartModifiers.add(rubberBandZoomModifier);
  sciChartSurface.chartModifiers.add(mouseWheelZoomModifier);
  const inputEnablePan = document.getElementById("enable-pan");
  const inputEnableZoom = document.getElementById("enable-zoom");
  const inputEnableZoomToFit = document.getElementById("enable-zoom-to-fit");
  const inputEnableMouseWheel = document.getElementById("enable-mouse-wheel-zoom");
  inputEnablePan.addEventListener("input", (event) => {
    zoomPanModifier.isEnabled = inputEnablePan.checked;
    rubberBandZoomModifier.isEnabled = !inputEnablePan.checked;
    inputEnableZoom.checked = !inputEnablePan.checked;
  });
  inputEnableZoom.addEventListener("input", (event) => {
    rubberBandZoomModifier.isEnabled = inputEnableZoom.checked;
    zoomPanModifier.isEnabled = !inputEnableZoom.checked;
    inputEnablePan.checked = !inputEnableZoom.checked;
  });
  inputEnableZoomToFit.addEventListener("input", (event) => {
    zoomExtentsModifier.isEnabled = inputEnableZoomToFit.checked;
  });
  inputEnableMouseWheel.addEventListener("input", (event) => {
    mouseWheelZoomModifier.isEnabled = inputEnableMouseWheel.checked;
  });


  sciChartSurface.chartModifiers.add(new RolloverModifier());

  sciChartSurface.annotations.add(
    // Add TextAnnotations in the top left of the chart
    new TextAnnotation({ text: "Annotations are Easy!", fontSize: 24, x1: 0.3, y1: 9.7 }),
    new TextAnnotation({ text: "You can create text", fontSize: 18, x1: 1, y1: 9 }),
    // Add TextAnnotations with anchor points
    new TextAnnotation({
      text: "Anchor Center (X1, Y1)",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
      verticalAnchorPoint: EVerticalAnchorPoint.Bottom,
      x1: 2,
      y1: 8
    }),
    new TextAnnotation({
      text: "Anchor Right",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Right,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      x1: 2,
      y1: 8
    }),
    new TextAnnotation({
      text: "or Anchor Left",
      horizontalAnchorPoint: EHorizontalAnchorPoint.Left,
      verticalAnchorPoint: EVerticalAnchorPoint.Top,
      x1: 2,
      y1: 8
    }),

  );


  // Declare a DataSeries
  const xyDataSeries1 = new XyDataSeries(wasmContext);
  const xyDataSeries2 = new XyDataSeries(wasmContext);
  const xyDataSeries3 = new XyDataSeries(wasmContext);
  const xyDataSeries4 = new XyDataSeries(wasmContext);
  const xyDataSeries5 = new XyDataSeries(wasmContext);
  const xyDataSeries6 = new XyDataSeries(wasmContext);
  // xyDataSeries.append(1, 2); // Append a single x,y point
  // xyDataSeries.appendRange([3, 4], [3, 4]); // Append multiple x,y points (faster)
  // console.log(data.dps6);
  // let data = [5, 9, 6, 3, 4, 1, 8, 9, 5, 3, 5, 8, 7, 5, 10, 8, 7];
  // let datalist = (data.dps6).map((item, index, arr) => {
  //   return [index, item]
  // })

  // console.log(datalist);
  (data.dps1).forEach((item, index) => {
    xyDataSeries1.append(index, item + 0);
  });

  (data.dps2).forEach((item, index) => {
    xyDataSeries2.append(index, item + 1);
  });
  (data.dps3).forEach((item, index) => {
    xyDataSeries3.append(index, item + 2);
  });
  (data.dps4).forEach((item, index) => {
    xyDataSeries4.append(index, item + 3);
  });

  (data.dps5).forEach((item, index) => {
    xyDataSeries5.append(index, item + 4);
  });

  (data.dps6).forEach((item, index) => {
    xyDataSeries6.append(index, item + 5);
  });



  // console.log(data);
  // let datalist = data.map(function (value, index) {
  //   let formatData = [];
  //   formatData.push([index, value]);
  //   return datalist
  // })

  // xyDataSeries.appendRange(...datalist);
  // console.log(datalist);

  // Add a line series to the SciChartSurface
  const lineSeries1 = new FastLineRenderableSeries(wasmContext);
  lineSeries1.strokeThickness = 2;
  lineSeries1.stroke = "rgba(255,0,0,1)";
  lineSeries1.dataSeries = xyDataSeries1;

  const lineSeries2 = new FastLineRenderableSeries(wasmContext);
  lineSeries2.strokeThickness = 2;
  lineSeries2.stroke = "rgba(255,0,0,1)";
  lineSeries2.dataSeries = xyDataSeries2;

  const lineSeries3 = new FastLineRenderableSeries(wasmContext);
  lineSeries3.strokeThickness = 2;
  lineSeries3.stroke = "rgba(255,0,0,1)";
  lineSeries3.dataSeries = xyDataSeries3;

  const lineSeries4 = new FastLineRenderableSeries(wasmContext);
  lineSeries4.strokeThickness = 2;
  lineSeries4.stroke = "rgba(255,0,0,1)";
  lineSeries4.dataSeries = xyDataSeries4;

  const lineSeries5 = new FastLineRenderableSeries(wasmContext);
  lineSeries5.strokeThickness = 2;
  lineSeries5.stroke = "rgba(255,0,0,1)";
  lineSeries5.dataSeries = xyDataSeries5;

  const lineSeries6 = new FastLineRenderableSeries(wasmContext);
  lineSeries6.strokeThickness = 2;
  lineSeries6.stroke = "rgba(255,0,0,1)";
  lineSeries6.dataSeries = xyDataSeries6;


  sciChartSurface.renderableSeries.add(lineSeries1);
  sciChartSurface.renderableSeries.add(lineSeries2);
  sciChartSurface.renderableSeries.add(lineSeries3);
  sciChartSurface.renderableSeries.add(lineSeries4);
  sciChartSurface.renderableSeries.add(lineSeries5);
  sciChartSurface.renderableSeries.add(lineSeries6);


  // sciChartSurface.annotations.add(
  //   // Watermark with CoordinateMode Relative
  //   new TextAnnotation({
  //     text: "Create Watermarks",
  //     horizontalAnchorPoint: EHorizontalAnchorPoint.Center,
  //     verticalAnchorPoint: EVerticalAnchorPoint.Center,
  //     x1: 5000,
  //     y1: 35,
  //     fontSize: 56,
  //     fontWeight: "Bold",
  //     textColor: "#FFFFFF22",
  //     xCoordinateMode: ECoordinateMode.Relative,
  //     yCoordinateMode: ECoordinateMode.Relative,
  //     annotationLayer: EAnnotationLayer.BelowChart,
  //   }),
  // );

  // zoom to fit
  sciChartSurface.zoomExtents();

}
initSciChart();








