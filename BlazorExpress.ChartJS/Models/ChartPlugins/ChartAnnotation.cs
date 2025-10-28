using System.Text.Json.Serialization;

namespace BlazorExpress.ChartJS;

/// <summary>
/// Configuration for the chartjs-plugin-annotation
/// <see href="https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/"/>
/// </summary>
public class ChartAnnotation
{
    /// <summary>
    /// Collection of annotation configurations indexed by annotation ID
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("annotations")]
    public Dictionary<string, AnnotationConfig>? Annotations { get; set; }
}

/// <summary>
/// Base configuration for an individual annotation
/// </summary>
public class AnnotationConfig
{
    /// <summary>
    /// Type of annotation. Supported values: 'line', 'box', 'ellipse', 'point', 'polygon'
    /// </summary>
    [JsonPropertyName("type")]
    public string Type { get; set; } = "line";

    /// <summary>
    /// Whether the annotation is displayed
    /// </summary>
    [JsonPropertyName("display")]
    public bool Display { get; set; } = true;

    /// <summary>
    /// ID of the scale on which to draw the annotation
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("scaleID")]
    public string? ScaleID { get; set; }

    /// <summary>
    /// Data value on the scale. Can be a number, string, or function
    /// For function support, this will be serialized as a string containing the function
    /// </summary>
    [JsonPropertyName("value")]
    public object? Value { get; set; }

    /// <summary>
    /// End value for ranged annotations
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("endValue")]
    public object? EndValue { get; set; }

    /// <summary>
    /// Color of the annotation border
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("borderColor")]
    public string? BorderColor { get; set; } = "rgba(0,0,0,1)";

    /// <summary>
    /// Width of the annotation border in pixels
    /// </summary>
    [JsonPropertyName("borderWidth")]
    public int BorderWidth { get; set; } = 1;

    /// <summary>
    /// Dash pattern for the border line
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("borderDash")]
    public int[]? BorderDash { get; set; }

    /// <summary>
    /// Offset for line dashes
    /// </summary>
    [JsonPropertyName("borderDashOffset")]
    public int BorderDashOffset { get; set; } = 0;

    /// <summary>
    /// Background color of the annotation
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("backgroundColor")]
    public string? BackgroundColor { get; set; }

    /// <summary>
    /// Label configuration for the annotation
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("label")]
    public AnnotationLabel? Label { get; set; }

    /// <summary>
    /// When to draw the annotation relative to other elements
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("drawTime")]
    public string? DrawTime { get; set; }

    /// <summary>
    /// Mouse enter event handler (JavaScript function as string)
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("enter")]
    public string? Enter { get; set; }

    /// <summary>
    /// Mouse leave event handler (JavaScript function as string)
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("leave")]
    public string? Leave { get; set; }
}

/// <summary>
/// Configuration for line type annotations
/// </summary>
public class LineAnnotationConfig : AnnotationConfig
{
    /// <summary>
    /// Constructor that sets type to 'line'
    /// </summary>
    public LineAnnotationConfig()
    {
        Type = "line";
    }

    /// <summary>
    /// Y minimum value for horizontal lines
    /// </summary>
    [JsonPropertyName("yMin")]
    public object? YMin { get; set; }

    /// <summary>
    /// Y maximum value for horizontal lines (usually same as YMin for a single line)
    /// </summary>
    [JsonPropertyName("yMax")]
    public object? YMax { get; set; }

    /// <summary>
    /// X minimum value for vertical lines
    /// </summary>
    [JsonPropertyName("xMin")]
    public object? XMin { get; set; }

    /// <summary>
    /// X maximum value for vertical lines (usually same as XMin for a single line)
    /// </summary>
    [JsonPropertyName("xMax")]
    public object? XMax { get; set; }
}

/// <summary>
/// Configuration for box type annotations  
/// </summary>
public class BoxAnnotationConfig : AnnotationConfig
{
    /// <summary>
    /// Constructor that sets type to 'box'
    /// </summary>
    public BoxAnnotationConfig()
    {
        Type = "box";
    }

    /// <summary>
    /// X minimum value
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("xMin")]
    public object? XMin { get; set; }

    /// <summary>
    /// X maximum value
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("xMax")]
    public object? XMax { get; set; }

    /// <summary>
    /// Y minimum value
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("yMin")]
    public object? YMin { get; set; }

    /// <summary>
    /// Y maximum value
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("yMax")]
    public object? YMax { get; set; }
}

/// <summary>
/// Label configuration for annotations
/// </summary>
public class AnnotationLabel
{
    /// <summary>
    /// Whether the label is enabled/displayed
    /// </summary>
    [JsonPropertyName("enabled")]
    public bool Enabled { get; set; } = false;

    /// <summary>
    /// Label content. Can be string or function
    /// For function support, this will be serialized as a string containing the function
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("content")]
    public object? Content { get; set; }

    /// <summary>
    /// Position of the label relative to the annotation
    /// Options: 'start', 'center', 'end' for line annotations
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("position")]
    public string? Position { get; set; } = "center";

    /// <summary>
    /// Background color of the label
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("backgroundColor")]
    public string? BackgroundColor { get; set; }

    /// <summary>
    /// Text color of the label
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("color")]
    public string? Color { get; set; } = "black";

    /// <summary>
    /// Font configuration for the label
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("font")]
    public AnnotationLabelFont? Font { get; set; }

    /// <summary>
    /// Padding around the label text
    /// </summary>
    [JsonPropertyName("padding")]
    public int Padding { get; set; } = 6;

    /// <summary>
    /// X adjustment for label position
    /// </summary>
    [JsonPropertyName("xAdjust")]
    public int XAdjust { get; set; } = 0;

    /// <summary>
    /// Y adjustment for label position
    /// </summary>
    [JsonPropertyName("yAdjust")]
    public int YAdjust { get; set; } = 0;

    /// <summary>
    /// When to draw the label relative to other elements
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("drawTime")]
    public string? DrawTime { get; set; }

    /// <summary>
    /// Text alignment for multi-line labels
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("textAlign")]
    public string? TextAlign { get; set; }
}

/// <summary>
/// Font configuration for annotation labels
/// </summary>
public class AnnotationLabelFont
{
    /// <summary>
    /// Font family
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("family")]
    public string? Family { get; set; }

    /// <summary>
    /// Font size in pixels
    /// </summary>
    [JsonPropertyName("size")]
    public int Size { get; set; } = 12;

    /// <summary>
    /// Font style
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("style")]
    public string? Style { get; set; }

    /// <summary>
    /// Font weight
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    [JsonPropertyName("weight")]
    public string? Weight { get; set; }
}
