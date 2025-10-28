namespace BlazorExpress.ChartJS;

public class ScatterChartPlugins : ChartPlugins
{
    #region Properties, Indexers

    public ScatterChartDataLabels Datalabels { get; set; } = new();

    /// <summary>
    /// Annotation plugin configuration for adding lines, boxes, and other annotations to the chart
    /// <see href="https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/"/>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ChartAnnotation? Annotation { get; set; }

    #endregion
}

public class ScatterChartDataLabels
{
    #region Properties, Indexers

    public double BorderRadius { get; set; } = 4;
    public string? Color { get; set; } = "white";
    public ScatterChartDataLabelsFont Font { get; set; } = new();
    public double Padding { get; set; } = 6;

    #endregion
}

public class ScatterChartDataLabelsFont
{
    #region Properties, Indexers

    public string? Weight { get; set; } = "bold";

    #endregion
}
