// A scroll view under a navigation bar and a tab bar, so the scroll edge
// effect can be read from the layer tree and from screenshots.
//
//   BLUR_EDGE     automatic, soft or hard
//   BLUR_CONTENT  bars (60-point black and white columns, for measuring),
//                 colour (the same columns in saturated colours) or rows
//   BLUR_SCHEME   light or dark
//   BLUR_TITLE    large or inline
//   BLUR_CHROME   full, or bare for no title and no toolbar button
import SwiftUI

// BLUR_PROBE swaps the screen for the bars under strips of backdrop layers
// built here, one per comma-separated "type:radius:scale:mask", so each
// private filter can be measured at known inputs:
//
//   BLUR_PROBE=gaussianBlur:16:0.25,variableBlur:1.5:0.5:384
//
// A variableBlur's mask is a number, for a solid white mask that many pixels
// tall, or the path of a PNG. It defaults to a solid 4 pixels.
struct Probe: UIViewRepresentable {
  let spec: String

  func makeUIView(context: Context) -> UIView {
    let view = UIView()
    view.backgroundColor = .white
    for i in 0..<7 {
      let bar = CALayer()
      bar.backgroundColor = (i.isMultiple(of: 2) ? UIColor.black : UIColor.white).cgColor
      bar.frame = CGRect(x: -9 + Double(i) * 60, y: 0, width: 60, height: 2000)
      view.layer.addSublayer(bar)
    }
    func mask(_ value: String) -> CGImage {
      if let height = Int(value) {
        let ctx = CGContext(
          data: nil, width: 1, height: height, bitsPerComponent: 8, bytesPerRow: 4,
          space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
        ctx.setFillColor(UIColor.white.cgColor)
        ctx.fill(CGRect(x: 0, y: 0, width: 1, height: height))
        return ctx.makeImage()!
      }
      return UIImage(contentsOfFile: value)!.cgImage!
    }
    let filterClass = NSClassFromString("CAFilter") as! NSObject.Type
    let backdropClass = NSClassFromString("CABackdropLayer") as! CALayer.Type
    for (i, item) in spec.split(separator: ",").enumerated() {
      let parts = item.split(separator: ":").map(String.init)
      let filter =
        filterClass.perform(NSSelectorFromString("filterWithType:"), with: parts[0])
        .takeUnretainedValue() as! NSObject
      filter.setValue(Double(parts[1])!, forKey: "inputRadius")
      filter.setValue(true, forKey: "inputNormalizeEdges")
      if parts[0] == "variableBlur" {
        filter.setValue(mask(parts.count > 3 ? parts[3] : "4"), forKey: "inputMaskImage")
      }
      let strip = backdropClass.init()
      strip.setValue(Double(parts.count > 2 ? parts[2] : "1")!, forKey: "scale")
      strip.filters = [filter]
      strip.frame = CGRect(x: -9, y: 70 + Double(i) * 96, width: 420, height: 80)
      view.layer.addSublayer(strip)
    }
    return view
  }

  func updateUIView(_ view: UIView, context: Context) {}
}

@main
struct BlurHarness: App {
  var body: some Scene {
    WindowGroup { Harness() }
  }
}

let env = ProcessInfo.processInfo.environment

struct Harness: View {
  private let edge = env["BLUR_EDGE"] ?? "automatic"
  private let content = env["BLUR_CONTENT"] ?? "bars"
  private let dark = env["BLUR_SCHEME"] == "dark"
  private let large = env["BLUR_TITLE"] != "inline"
  // No title and no buttons, so the bar draws nothing over the content.
  private let bare = env["BLUR_CHROME"] == "bare"

  var body: some View {
    if let probe = env["BLUR_PROBE"] { Probe(spec: probe).ignoresSafeArea() } else { tabs }
  }

  private var tabs: some View {
    TabView {
      Tab("Home", systemImage: "house") { screen }
      Tab("Search", systemImage: "magnifyingglass") { screen }
      Tab("Library", systemImage: "square.stack") { screen }
    }
    .preferredColorScheme(dark ? .dark : .light)
  }

  private var screen: some View {
    NavigationStack {
      scroll
        .navigationTitle(bare ? "" : "Library")
        .navigationBarTitleDisplayMode(large ? .large : .inline)
        .toolbar {
          if !bare {
            ToolbarItem(placement: .topBarTrailing) {
              Button("Add", systemImage: "plus") {}
            }
          }
        }
    }
  }

  @ViewBuilder private var scroll: some View {
    let view = ScrollView {
      switch content {
      case "rows": rows
      case "colour": colours
      default: bars
      }
    }
    // Starting mid-content puts something under both bars, which is when the
    // edge effects switch on.
    .defaultScrollAnchor(.center)
    .accessibilityIdentifier("blur.scroll")
    switch edge {
    case "soft": view.scrollEdgeEffectStyle(.soft, for: .all)
    case "hard": view.scrollEdgeEffectStyle(.hard, for: .all)
    default: view
    }
  }

  private var bars: some View { Self.bars.frame(height: 3000) }

  fileprivate static var bars: some View {
    HStack(spacing: 0) {
      ForEach(0..<7) { i in
        Rectangle()
          .fill(i.isMultiple(of: 2) ? Color.black : Color.white)
          .frame(width: 60)
      }
    }
  }

  // Same columns as the bars, in saturated sRGB, so each channel lightens and
  // darkens on its own.
  static let palette: [(Double, Double, Double)] = [
    (1, 0.23, 0.19), (1, 0.8, 0), (0.2, 0.78, 0.35), (0.2, 0.68, 0.9),
    (0, 0.48, 1), (0.69, 0.32, 0.87), (1, 0.18, 0.33),
  ]

  private var colours: some View {
    HStack(spacing: 0) {
      ForEach(0..<7) { i in
        let (r, g, b) = Self.palette[i]
        Rectangle().fill(Color(.sRGB, red: r, green: g, blue: b)).frame(width: 60)
      }
    }
    .frame(height: 3000)
  }

  private var rows: some View {
    LazyVStack(alignment: .leading, spacing: 0) {
      ForEach(0..<80) { i in
        HStack(spacing: 14) {
          RoundedRectangle(cornerRadius: 10)
            .fill(Color(hue: Double(i % 12) / 12, saturation: 0.7, brightness: 0.9))
            .frame(width: 44, height: 44)
          VStack(alignment: .leading) {
            Text("Item \(i + 1)").font(.headline)
            Text("A line of secondary text").foregroundStyle(.secondary)
          }
        }
        .padding(.horizontal, 20)
        .padding(.vertical, 8)
      }
    }
  }
}
