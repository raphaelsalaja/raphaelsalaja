// A macOS window with a sidebar, a toolbar and the bars scrolling under it,
// so the toolbar's scroll edge effect can be read like the iOS one.
//
//   BLUR_EDGE     automatic, soft or hard
//   BLUR_SCHEME   light or dark
import SwiftUI

let env = ProcessInfo.processInfo.environment

@main
struct BlurMac: App {
  var body: some Scene {
    WindowGroup { Window() }
      .defaultSize(width: 900, height: 600)
      .windowResizability(.contentSize)
  }
}

struct Window: View {
  private let edge = env["BLUR_EDGE"] ?? "automatic"
  private let dark = env["BLUR_SCHEME"] == "dark"

  var body: some View {
    NavigationSplitView {
      List(0..<60) { i in Label("Item \(i + 1)", systemImage: "folder") }
        .defaultScrollAnchor(.center)
    } detail: {
      detail
        .navigationTitle("Library")
        .toolbar {
          ToolbarItem { Button("Add", systemImage: "plus") {} }
          ToolbarItem { Button("Share", systemImage: "square.and.arrow.up") {} }
        }
    }
    .frame(width: 900, height: 600)
    .preferredColorScheme(dark ? .dark : .light)
  }

  @ViewBuilder private var detail: some View {
    let view = ScrollView {
      HStack(spacing: 0) {
        ForEach(0..<12) { i in
          Rectangle()
            .fill(i.isMultiple(of: 2) ? Color.black : Color.white)
            .frame(width: 60)
        }
      }
      .frame(height: 3000)
    }
    .defaultScrollAnchor(.center)
    switch edge {
    case "soft": view.scrollEdgeEffectStyle(.soft, for: .all)
    case "hard": view.scrollEdgeEffectStyle(.hard, for: .all)
    default: view
    }
  }
}
