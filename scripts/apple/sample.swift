// Samples Apple's own spring and curve implementations into JSON fixtures.
//   swift scripts/apple/sample.swift > content/work/apple/fixtures/swiftui.json
import Foundation
import QuartzCore
import SwiftUI

struct Named {
  let name: String
  let spring: Spring
}

let springs: [Named] = [
  Named(name: "default", spring: Spring()),
  Named(name: "smooth", spring: .smooth),
  Named(name: "snappy", spring: .snappy),
  Named(name: "bouncy", spring: .bouncy),
  Named(name: "smooth(duration:0.3)", spring: .smooth(duration: 0.3)),
  Named(name: "snappy(duration:0.4,extraBounce:0.1)", spring: .snappy(duration: 0.4, extraBounce: 0.1)),
  Named(name: "bouncy(duration:0.6,extraBounce:0.2)", spring: .bouncy(duration: 0.6, extraBounce: 0.2)),
  Named(name: "duration:0.5,bounce:-0.3", spring: Spring(duration: 0.5, bounce: -0.3)),
  Named(name: "response:0.55,dampingRatio:0.825", spring: Spring(response: 0.55, dampingRatio: 0.825)),
  Named(name: "mass:1,stiffness:100,damping:10", spring: Spring(mass: 1, stiffness: 100, damping: 10)),
  Named(name: "mass:3,stiffness:1000,damping:500", spring: Spring(mass: 3, stiffness: 1000, damping: 500)),
  Named(name: "settlingDuration:1,dampingRatio:0.7", spring: Spring(settlingDuration: 1, dampingRatio: 0.7)),
]

let dt = 1.0 / 120
var springRows: [[String: Any]] = []
for named in springs {
  let s = named.spring
  var values: [Double] = []
  var velocities: [Double] = []
  var kicked: [Double] = []
  var t = 0.0
  while t <= 1.5 + 1e-9 {
    values.append(s.value(target: 1.0, time: t))
    velocities.append(s.velocity(target: 1.0, time: t))
    kicked.append(s.value(target: 1.0, initialVelocity: 4.0, time: t))
    t += dt
  }
  springRows.append([
    "name": named.name,
    "response": s.response,
    "dampingRatio": s.dampingRatio,
    "duration": s.duration,
    "bounce": s.bounce,
    "mass": s.mass,
    "stiffness": s.stiffness,
    "damping": s.damping,
    "settlingDuration": s.settlingDuration,
    "dt": dt,
    "value": values,
    "velocity": velocities,
    "valueWithVelocity4": kicked,
  ])
}

var curveRows: [[String: Any]] = []
for name in [CAMediaTimingFunctionName.linear, .easeIn, .easeOut, .easeInEaseOut, .default] {
  let f = CAMediaTimingFunction(name: name)
  var points: [Float] = []
  for i in 1...2 {
    var p: [Float] = [0, 0]
    f.getControlPoint(at: i, values: &p)
    points += p
  }
  curveRows.append(["name": name.rawValue, "controlPoints": points])
}

var unitCurves: [[String: Any]] = []
for (name, curve) in [("easeIn", UnitCurve.easeIn), ("easeOut", .easeOut), ("easeInOut", .easeInOut),
                      ("circularEaseIn", .circularEaseIn), ("circularEaseOut", .circularEaseOut),
                      ("circularEaseInOut", .circularEaseInOut)] {
  unitCurves.append(["name": name, "value": stride(from: 0.0, through: 1.0, by: 0.05).map { curve.value(at: $0) }])
}

let animations: [String: String] = [
  "default": String(describing: Animation.default),
  "spring": String(describing: Animation.spring),
  "interactiveSpring": String(describing: Animation.interactiveSpring),
  "smooth": String(describing: Animation.smooth),
  "snappy": String(describing: Animation.snappy),
  "bouncy": String(describing: Animation.bouncy),
  "easeInOut": String(describing: Animation.easeInOut),
]

let out: [String: Any] = [
  "os": ProcessInfo.processInfo.operatingSystemVersionString,
  "springs": springRows,
  "curves": curveRows,
  "unitCurves": unitCurves,
  "animations": animations,
]
let data = try JSONSerialization.data(withJSONObject: out, options: [.sortedKeys])
FileHandle.standardOutput.write(data)
