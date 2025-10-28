namespace BlazorExpress.ChartJS;

public class BarChartPlugins : ChartPlugins
{
    #region Properties, Indexers

    public BarChartDataLabels Datalabels { get; set; } = new();

    /// <summary>
    /// Annotation plugin configuration for adding lines, boxes, and other annotations to the chart
    /// <see href="https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/"/>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ChartAnnotation? Annotation { get; set; }

    #endregion
}

public class BarChartDataLabels
{
    #region Properties, Indexers

    public string? Color { get; set; } = "white";
    public BarChartDataLabelsFont Font { get; set; } = new();

    #endregion
}

public class BarChartDataLabelsFont
{
    #region Properties, Indexers

    public string? Weight { get; set; } = "bold";

    #endregion
}
