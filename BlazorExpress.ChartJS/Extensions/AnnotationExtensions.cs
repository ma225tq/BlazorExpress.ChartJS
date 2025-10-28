namespace BlazorExpress.ChartJS;

/// <summary>
/// Extension methods for easily creating common annotation patterns
/// </summary>
public static class AnnotationExtensions
{
    /// <summary>
    /// Creates an average line annotation for the chart
    /// </summary>
    /// <param name="plugins">The chart plugins configuration</param>
    /// <param name="annotationId">Unique identifier for this annotation (default: "averageLine")</param>
    /// <param name="scaleId">Scale ID on which to draw the line (default: "y")</param>
    /// <param name="borderColor">Color of the average line (default: "black")</param>
    /// <param name="borderWidth">Width of the line in pixels (default: 3)</param>
    /// <param name="borderDash">Dash pattern for the line (default: [6, 6] for dashed line)</param>
    /// <param name="showLabel">Whether to show the average value label (default: true)</param>
    /// <param name="labelContent">Custom label content function (default: shows "Average: {value}")</param>
    /// <param name="labelPosition">Position of the label relative to the line (default: "end")</param>
    /// <returns>The plugins configuration with the average line annotation added</returns>
    public static T AddAverageLineAnnotation<T>(
        this T plugins, 
        string annotationId = "averageLine",
        string scaleId = "y",
        string borderColor = "black",
        int borderWidth = 3,
        int[]? borderDash = null,
        bool showLabel = true,
        string? labelContent = null,
        string labelPosition = "end")
        where T : ChartPlugins
    {
        borderDash ??= new[] { 6, 6 };
        labelContent ??= "function(ctx) { const values = ctx.chart.data.datasets[0].data; const avg = values.reduce((a, b) => a + b, 0) / values.length; return 'Average: ' + avg.toFixed(2); }";
        
        // Get or create annotation configuration based on plugin type
        ChartAnnotation? annotation = null;
        
        if (plugins is LineChartPlugins linePlugins)
        {
            linePlugins.Annotation ??= new ChartAnnotation();
            annotation = linePlugins.Annotation;
        }
        else if (plugins is BarChartPlugins barPlugins)
        {
            barPlugins.Annotation ??= new ChartAnnotation();
            annotation = barPlugins.Annotation;
        }
        else if (plugins is ScatterChartPlugins scatterPlugins)
        {
            scatterPlugins.Annotation ??= new ChartAnnotation();
            annotation = scatterPlugins.Annotation;
        }
        
        if (annotation != null)
        {
            annotation.Annotations ??= new Dictionary<string, AnnotationConfig>();

            var averageLine = new LineAnnotationConfig
            {
                BorderColor = borderColor,
                BorderWidth = borderWidth,
                BorderDash = borderDash,
                ScaleID = scaleId,
                Value = "function(ctx) { const values = ctx.chart.data.datasets[0].data; return values.reduce((a, b) => a + b, 0) / values.length; }",
                Label = showLabel ? new AnnotationLabel
                {
                    Enabled = true,
                    Content = labelContent,
                    Position = labelPosition
                } : null
            };

            annotation.Annotations[annotationId] = averageLine;
        }
        
        return plugins;
    }

    /// <summary>
    /// Creates a horizontal line annotation at a specific value
    /// </summary>
    /// <param name="plugins">The chart plugins configuration</param>
    /// <param name="value">The Y-axis value where to draw the line</param>
    /// <param name="annotationId">Unique identifier for this annotation</param>
    /// <param name="scaleId">Scale ID on which to draw the line (default: "y")</param>
    /// <param name="borderColor">Color of the line (default: "red")</param>
    /// <param name="borderWidth">Width of the line in pixels (default: 2)</param>
    /// <param name="borderDash">Dash pattern for the line (default: solid line)</param>
    /// <param name="label">Optional label text for the line</param>
    /// <param name="labelPosition">Position of the label relative to the line (default: "end")</param>
    /// <returns>The plugins configuration with the horizontal line annotation added</returns>
    public static T AddHorizontalLineAnnotation<T>(
        this T plugins,
        double value,
        string annotationId,
        string scaleId = "y",
        string borderColor = "red",
        int borderWidth = 2,
        int[]? borderDash = null,
        string? label = null,
        string labelPosition = "end")
        where T : ChartPlugins
    {
        // Get or create annotation configuration based on plugin type
        ChartAnnotation? annotation = null;
        
        if (plugins is LineChartPlugins linePlugins)
        {
            linePlugins.Annotation ??= new ChartAnnotation();
            annotation = linePlugins.Annotation;
        }
        else if (plugins is BarChartPlugins barPlugins)
        {
            barPlugins.Annotation ??= new ChartAnnotation();
            annotation = barPlugins.Annotation;
        }
        else if (plugins is ScatterChartPlugins scatterPlugins)
        {
            scatterPlugins.Annotation ??= new ChartAnnotation();
            annotation = scatterPlugins.Annotation;
        }
        
        if (annotation != null)
        {
            annotation.Annotations ??= new Dictionary<string, AnnotationConfig>();

            var horizontalLine = new LineAnnotationConfig
            {
                BorderColor = borderColor,
                BorderWidth = borderWidth,
                BorderDash = borderDash,
                ScaleID = scaleId,
                Value = value,
                Label = !string.IsNullOrEmpty(label) ? new AnnotationLabel
                {
                    Enabled = true,
                    Content = label,
                    Position = labelPosition
                } : null
            };

            annotation.Annotations[annotationId] = horizontalLine;
        }
        
        return plugins;
    }

    /// <summary>
    /// Creates a threshold box annotation (highlighting values above/below a threshold)
    /// </summary>
    /// <param name="plugins">The chart plugins configuration</param>
    /// <param name="thresholdValue">The threshold value</param>
    /// <param name="annotationId">Unique identifier for this annotation</param>
    /// <param name="isAboveThreshold">Whether to highlight above (true) or below (false) the threshold</param>
    /// <param name="backgroundColor">Background color of the highlighted area (default: semi-transparent red)</param>
    /// <param name="borderColor">Border color of the box (default: red)</param>
    /// <param name="label">Optional label text</param>
    /// <returns>The plugins configuration with the threshold box annotation added</returns>
    public static T AddThresholdBoxAnnotation<T>(
        this T plugins,
        double thresholdValue,
        string annotationId,
        bool isAboveThreshold = true,
        string backgroundColor = "rgba(255, 0, 0, 0.1)",
        string borderColor = "red",
        string? label = null)
        where T : ChartPlugins
    {
        // Get or create annotation configuration based on plugin type
        ChartAnnotation? annotation = null;
        
        if (plugins is LineChartPlugins linePlugins)
        {
            linePlugins.Annotation ??= new ChartAnnotation();
            annotation = linePlugins.Annotation;
        }
        else if (plugins is BarChartPlugins barPlugins)
        {
            barPlugins.Annotation ??= new ChartAnnotation();
            annotation = barPlugins.Annotation;
        }
        else if (plugins is ScatterChartPlugins scatterPlugins)
        {
            scatterPlugins.Annotation ??= new ChartAnnotation();
            annotation = scatterPlugins.Annotation;
        }
        
        if (annotation != null)
        {
            annotation.Annotations ??= new Dictionary<string, AnnotationConfig>();

            var thresholdBox = new BoxAnnotationConfig
            {
                BackgroundColor = backgroundColor,
                BorderColor = borderColor,
                BorderWidth = 1
            };

            if (isAboveThreshold)
            {
                thresholdBox.YMin = thresholdValue;
                thresholdBox.YMax = "function(ctx) { return ctx.chart.scales.y.max; }";
            }
            else
            {
                thresholdBox.YMin = "function(ctx) { return ctx.chart.scales.y.min; }";
                thresholdBox.YMax = thresholdValue;
            }

            // Set X range to cover the full chart
            thresholdBox.XMin = "function(ctx) { return ctx.chart.scales.x.min; }";
            thresholdBox.XMax = "function(ctx) { return ctx.chart.scales.x.max; }";

            if (!string.IsNullOrEmpty(label))
            {
                thresholdBox.Label = new AnnotationLabel
                {
                    Enabled = true,
                    Content = label,
                    Position = "center"
                };
            }

            annotation.Annotations[annotationId] = thresholdBox;
        }
        
        return plugins;
    }

    /// <summary>
    /// Creates a vertical line annotation at a specific X-axis value
    /// </summary>
    /// <param name="plugins">The chart plugins configuration</param>
    /// <param name="value">The X-axis value where to draw the line</param>
    /// <param name="annotationId">Unique identifier for this annotation</param>
    /// <param name="scaleId">Scale ID on which to draw the line (default: "x")</param>
    /// <param name="borderColor">Color of the line (default: "blue")</param>
    /// <param name="borderWidth">Width of the line in pixels (default: 2)</param>
    /// <param name="borderDash">Dash pattern for the line (default: solid line)</param>
    /// <param name="label">Optional label text for the line</param>
    /// <param name="labelPosition">Position of the label relative to the line (default: "start")</param>
    /// <returns>The plugins configuration with the vertical line annotation added</returns>
    public static T AddVerticalLineAnnotation<T>(
        this T plugins,
        object value,
        string annotationId,
        string scaleId = "x",
        string borderColor = "blue",
        int borderWidth = 2,
        int[]? borderDash = null,
        string? label = null,
        string labelPosition = "start")
        where T : ChartPlugins
    {
        // Get or create annotation configuration based on plugin type
        ChartAnnotation? annotation = null;
        
        if (plugins is LineChartPlugins linePlugins)
        {
            linePlugins.Annotation ??= new ChartAnnotation();
            annotation = linePlugins.Annotation;
        }
        else if (plugins is BarChartPlugins barPlugins)
        {
            barPlugins.Annotation ??= new ChartAnnotation();
            annotation = barPlugins.Annotation;
        }
        else if (plugins is ScatterChartPlugins scatterPlugins)
        {
            scatterPlugins.Annotation ??= new ChartAnnotation();
            annotation = scatterPlugins.Annotation;
        }
        
        if (annotation != null)
        {
            annotation.Annotations ??= new Dictionary<string, AnnotationConfig>();

            var verticalLine = new LineAnnotationConfig
            {
                BorderColor = borderColor,
                BorderWidth = borderWidth,
                BorderDash = borderDash,
                ScaleID = scaleId,
                Value = value,
                Label = !string.IsNullOrEmpty(label) ? new AnnotationLabel
                {
                    Enabled = true,
                    Content = label,
                    Position = labelPosition
                } : null
            };

            annotation.Annotations[annotationId] = verticalLine;
        }
        
        return plugins;
    }
}
