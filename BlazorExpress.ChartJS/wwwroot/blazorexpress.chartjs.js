if (!window.blazorexpress) {
  window.blazorexpress = {};
}

if (!window.blazorexpress.chartjs) {
  window.blazorexpress.chartjs = {};
}

if (!window.blazorexpress.chartjs.bar) {
  window.blazorexpress.chartjs.bar = {};
}

if (!window.blazorexpress.chartjs.bubble) {
  window.blazorexpress.chartjs.bubble = {};
}

if (!window.blazorexpress.chartjs.doughnut) {
  window.blazorexpress.chartjs.doughnut = {};
}

if (!window.blazorexpress.chartjs.line) {
  window.blazorexpress.chartjs.line = {};
}

if (!window.blazorexpress.chartjs.pie) {
  window.blazorexpress.chartjs.pie = {};
}

if (!window.blazorexpress.chartjs.polarArea) {
  window.blazorexpress.chartjs.polarArea = {};
}

if (!window.blazorexpress.chartjs.radar) {
  window.blazorexpress.chartjs.radar = {};
}

if (!window.blazorexpress.chartjs.scatter) {
  window.blazorexpress.chartjs.scatter = {};
}

window.blazorexpress.chartjs = {
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);
      }
      // chartjs-plugin-annotation auto-registers globally when loaded via CDN
      // It works through options.plugins.annotation configuration
    }

    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateNoAnimation: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update('none'); // 'none' mode disables all animations
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateDataValues: (elementId, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.splice(data.datasets.length);

      for (var datasetIndex = 0; datasetIndex < chart.data.datasets.length; ++datasetIndex) {
        chart.data.datasets[datasetIndex].data = data.datasets[datasetIndex].data;
        chart.data.labels = data.labels;
      }

      for (var datasetIndex = chart.data.datasets.length; datasetIndex < data.datasets.length; ++datasetIndex) {
        chart.data.datasets.push(data.datasets[datasetIndex]);
      }

      chart.update();
    }
  }
}

window.blazorexpress.chartjs.bar = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);
      }
      // chartjs-plugin-annotation auto-registers globally when loaded via CDN
      // It works through options.plugins.annotation configuration
    }

    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.bar.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.bar.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.bar.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.bar.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateNoAnimation: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.bar.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update('none');
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.bubble = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);
      }
      // chartjs-plugin-annotation auto-registers globally when loaded via CDN
      // It works through options.plugins.annotation configuration
    }

    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.bubble.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.bubble.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.bubble.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.bubble.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.doughnut = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
            chartData.datasets[datasetIndex].backgroundColor.push(chartDatasetData.backgroundColor);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.doughnut.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.doughnut.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.doughnut.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.doughnut.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.line = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    // Handle mixed charts - when type is "mixed", Chart.js uses dataset-level types
    const chartType = type === 'mixed' ? undefined : type;

    // Debug log for mixed charts
    if (type === 'mixed') {
      console.log('Mixed chart datasets:', data.datasets.map(ds => ({ label: ds.label, type: ds.type })));
    }

    // if (type === 'line' || type === 'mixed') {
    //     // Ensure hover defaults keep points circular without animated growth unless explicitly configured
    //     options = options || {};
    //     options.elements = options.elements || {};
    //     const pointOptions = options.elements.point = options.elements.point || {};

    //     if (typeof pointOptions.pointStyle === 'undefined') {
    //         pointOptions.pointStyle = 'circle';
    //     }
    //     if (typeof pointOptions.borderJoinStyle === 'undefined') {
    //         pointOptions.borderJoinStyle = 'round';
    //     }
    //     if (typeof pointOptions.radius === 'undefined') {
    //         pointOptions.radius = 3;
    //     }
    //     if (typeof pointOptions.hoverRadius === 'undefined') {
    //         pointOptions.hoverRadius = pointOptions.radius;
    //     }
    // }

    const config = {
      type: chartType,
      data: data,
      options: options,
      plugins: _plugins
    };

    if (type === 'line' || type === 'mixed') {
      // tooltipLine block
      const tooltipLine = {
        id: 'tooltipLine',
        beforeDraw: (chart) => {
          const tooltip = chart.tooltip;
          if (!tooltip || !tooltip._active || !tooltip._active.length) return;
      
          const ctx = chart.ctx;
          const activePoint = tooltip._active[0];
          const x = activePoint.element.x;
      
          ctx.save();
          try {
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'grey';
            ctx.moveTo(x, chart.chartArea.top);
            ctx.lineTo(x, chart.chartArea.bottom);
            ctx.stroke();
          } finally {
            ctx.restore();
          }
        }
      };
      

      config.plugins.push(tooltipLine);
    }

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.line.get(elementId);
    if (chart)
      return;
    else
      window.blazorexpress.chartjs.line.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.line.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.line.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateNoAnimation: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.line.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update('none');
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.pie = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
            chartData.datasets[datasetIndex].backgroundColor.push(chartDatasetData.backgroundColor);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    // https://www.chartjs.org/docs/latest/configuration/#configuration-object-structure
    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.pie.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.pie.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.pie.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.pie.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.polarArea = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
            chartData.datasets[datasetIndex].backgroundColor.push(chartDatasetData.backgroundColor);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    // https://www.chartjs.org/docs/latest/configuration/#configuration-object-structure
    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.polarArea.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.polarArea.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.polarArea.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.polarArea.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
}

window.blazorexpress.chartjs.radar = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    // https://www.chartjs.org/docs/latest/configuration/#configuration-object-structure
    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.radar.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.radar.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.radar.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.radar.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateDataValues: (elementId, data) => {
    let chart = window.blazorexpress.chartjs.radar.get(elementId);
    if (chart) {
      chart.data.datasets.splice(data.datasets.length);

      for (var datasetIndex = 0; datasetIndex < chart.data.datasets.length; ++datasetIndex) {
        chart.data.datasets[datasetIndex].data = data.datasets[datasetIndex].data;
        chart.data.labels = data.labels;
      }

      for (var datasetIndex = chart.data.datasets.length; datasetIndex < data.datasets.length; ++datasetIndex) {
        chart.data.datasets.push(data.datasets[datasetIndex]);
      }

      chart.update();
    }
  }
}

window.blazorexpress.chartjs.scatter = {
  addDatasetData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      const chartData = chart.data;
      const chartDatasetData = data;

      if (!chartData.labels.includes(dataLabel))
        chartData.labels.push(dataLabel);

      const chartDatasets = chartData.datasets;

      if (chartDatasets.length > 0) {
        let datasetIndex = chartDatasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
        if (datasetIndex > -1) {
          chartDatasets[datasetIndex].data.push(chartDatasetData.data);
          chart.update();
        }
      }
    }
  },
  addDatasetsData: (elementId, dataLabel, data) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart && data) {
      const chartData = chart.data;

      if (!chartData.labels.includes(dataLabel)) {
        chartData.labels.push(dataLabel);

        if (chartData.datasets.length > 0 && chartData.datasets.length === data.length) {
          data.forEach(chartDatasetData => {
            let datasetIndex = chartData.datasets.findIndex(dataset => dataset.label === chartDatasetData.datasetLabel);
            chartData.datasets[datasetIndex].data.push(chartDatasetData.data);
          });
          chart.update();
        }
      }
    }
  },
  addDataset: (elementId, newDataset) => {
    let chart = window.blazorexpress.chartjs.get(elementId);
    if (chart) {
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  create: (elementId, type, data, options, plugins) => {
    let chartEl = document.getElementById(elementId);
    let _plugins = [];

    if (plugins && plugins.length > 0) {
      // register `ChartDataLabels` plugin
      if (plugins.includes('ChartDataLabels')) {
        _plugins.push(ChartDataLabels);

        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }
      // register `chartjs-plugin-annotation` plugin
      if (plugins.includes('ChartAnnotation')) {
        _plugins.push(window.annotationPlugin);
      }
    }

    // https://www.chartjs.org/docs/latest/configuration/#configuration-object-structure
    const config = {
      type: type,
      data: data,
      options: options,
      plugins: _plugins
    };

    const chart = new Chart(
      chartEl,
      config
    );
  },
  get: (elementId) => {
    let chart;
    Chart.helpers.each(Chart.instances, function (instance) {
      if (instance.canvas.id === elementId) {
        chart = instance;
      }
    });

    return chart;
  },
  initialize: (elementId, type, data, options, plugins) => {
    let chart = window.blazorexpress.chartjs.scatter.get(elementId);
    if (chart) return;
    else
      window.blazorexpress.chartjs.scatter.create(elementId, type, data, options, plugins);
  },
  resize: (elementId, width, height) => {
    let chart = window.blazorexpress.chartjs.scatter.get(elementId);
    if (chart) {
      chart.canvas.parentNode.style.height = height;
      chart.canvas.parentNode.style.width = width;
    }
  },
  update: (elementId, type, data, options) => {
    let chart = window.blazorexpress.chartjs.scatter.get(elementId);
    if (chart) {
      if (chart.config.plugins && chart.config.plugins.findIndex(x => x.id == 'datalabels') > -1) {
        // set datalabel background color
        options.plugins.datalabels.backgroundColor = function (context) {
          return context.dataset.backgroundColor;
        };
      }

      chart.data = data;
      chart.options = options;
      chart.update();
    }
    else {
      console.warn(`The chart is not initialized. Initialize it and then call update.`);
    }
  },
  updateDataValues: (elementId, data) => {
    let chart = window.blazorexpress.chartjs.scatter.get(elementId);
    if (chart) {
      chart.data.datasets.splice(data.datasets.length);

      for (var datasetIndex = 0; datasetIndex < chart.data.datasets.length; ++datasetIndex) {
        chart.data.datasets[datasetIndex].data = data.datasets[datasetIndex].data;
        chart.data.labels = data.labels;
      }

      for (var datasetIndex = chart.data.datasets.length; datasetIndex < data.datasets.length; ++datasetIndex) {
        chart.data.datasets.push(data.datasets[datasetIndex]);
      }

      chart.update();
    }
  }
}
