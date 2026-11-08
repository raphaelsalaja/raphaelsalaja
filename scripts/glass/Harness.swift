// A glass button in the bottom corner that opens four rows, three ways:
//
//   menu    a native SwiftUI Menu with the glass button style
//   before  matchedTransitionSource on the button, outside the glass
//   after   matchedTransitionSource on the label, inside the glass (Kavsoft's)
//
// The variant comes from GLASS_VARIANT. glasshook.m posts "glass.toggle" to
// open and close it, so every run starts from the same place.
import SwiftUI

@main
struct GlassHarness: App {
  var body: some Scene {
    WindowGroup { Harness() }
  }
}

enum Variant: String {
  case menu, before, after
}

struct Row: Identifiable {
  let id: String
  let symbol: String
  let colour: Color
}

let rows = [
  Row(id: "Camera", symbol: "camera.fill", colour: .black),
  Row(id: "Store", symbol: "bag.fill", colour: .blue),
  Row(id: "Audio", symbol: "waveform", colour: .red),
  Row(id: "Check In", symbol: "checkmark", colour: .yellow),
]

struct Harness: View {
  @State private var show = false
  @Namespace private var namespace
  private let variant =
    Variant(rawValue: ProcessInfo.processInfo.environment["GLASS_VARIANT"] ?? "") ?? .after
  // GLASS_LABEL sizes the label inside the glass and GLASS_ROWS sets how many
  // rows open, so the morph can be measured between different shapes.
  private let label = Double(ProcessInfo.processInfo.environment["GLASS_LABEL"] ?? "") ?? 32
  private let count = Int(ProcessInfo.processInfo.environment["GLASS_ROWS"] ?? "") ?? 4
  // Black shows the glass's silhouette in a recording, white is how it ships.
  private let background: Color =
    ProcessInfo.processInfo.environment["GLASS_BACKGROUND"] == "black" ? .black : .white

  var body: some View {
    ZStack(alignment: .bottomTrailing) {
      background.ignoresSafeArea()
      button.padding(32)
    }
    .onReceive(NotificationCenter.default.publisher(for: .init("glass.toggle"))) { _ in
      show.toggle()
    }
  }

  private var plus: some View {
    Image(systemName: "plus")
      .font(.system(size: 20, weight: .medium))
      .frame(width: label, height: label)
  }

  private var list: some View {
    VStack(alignment: .leading, spacing: 20) {
      ForEach(rows.prefix(count)) { row in
        HStack(spacing: 14) {
          Image(systemName: row.symbol)
            .font(.system(size: 13, weight: .semibold))
            .foregroundStyle(.white)
            .frame(width: 28, height: 28)
            .background(row.colour, in: .circle)
          Text(row.id).font(.system(size: 17))
        }
      }
    }
    .padding(24)
  }

  @ViewBuilder private var button: some View {
    switch variant {
    case .menu:
      Menu {
        ForEach(rows) { row in
          Button(row.id, systemImage: row.symbol) {}
        }
      } label: {
        plus
      }
      .buttonStyle(.glass)
      .accessibilityIdentifier("glass.source")
    case .before:
      Button {
        show.toggle()
      } label: {
        plus
      }
      .buttonStyle(.glass)
      .matchedTransitionSource(id: "plus", in: namespace)
      .accessibilityIdentifier("glass.source")
      .popover(isPresented: $show) {
        list
          .presentationCompactAdaptation(.popover)
          .navigationTransition(.zoom(sourceID: "plus", in: namespace))
      }
    case .after:
      Button {
        show.toggle()
      } label: {
        plus.matchedTransitionSource(id: "plus", in: namespace)
      }
      .buttonStyle(.glass)
      .accessibilityIdentifier("glass.source")
      .popover(isPresented: $show) {
        list
          .presentationCompactAdaptation(.popover)
          .navigationTransition(.zoom(sourceID: "plus", in: namespace))
      }
    }
  }
}
