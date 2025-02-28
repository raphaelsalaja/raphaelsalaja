"use client";

import {
  RadialContextMenuContent,
  RadialContextMenuItem,
  RadialContextMenuPortal,
  RadialContextMenuRoot,
  RadialContextMenuTrigger,
} from "@rs/design/radial-context-menu";
import * as d3 from "d3";

import "./styles.css";
import { Cross1Icon } from "@radix-ui/react-icons";
import { motion } from "motion/react";

type DataItem = {
  content: React.ReactNode;
  label?: string;
};

export default function SvgRadialContextMenu() {
  const data: DataItem[] = [
    { content: "1" },
    { content: "2" },
    { content: "3" },
    { content: <Cross1Icon /> },

    { content: "10" },
    { content: "10" },
    { content: "10" },
  ];

  const size = {
    width: 120,
    height: 120,
  };

  const radius = {
    inner: 60,
    outer: 120,
  };

  const generators = {
    pie: d3.pie<DataItem>().value(1),
    arc: d3.arc<d3.PieArcDatum<DataItem>>().innerRadius(radius.inner).outerRadius(radius.outer),
  };
  const arcs = generators.pie(data);

  return (
    <RadialContextMenuRoot>
      <RadialContextMenuTrigger>Right-click here.</RadialContextMenuTrigger>
      <RadialContextMenuPortal>
        <RadialContextMenuContent>
          {/* Attach the ref to the SVG directly */}
          <motion.svg width={size.width} height={size.height} style={{ overflow: "visible" }}>
            <title>Radial Context Menu</title>

            <motion.g transform={`translate(${size.width / 2}, ${size.height / 2})`}>
              {/* Menu arcs */}
              {arcs.map((arc) => {
                const path = generators.arc(arc) || "";
                const [cx, cy] = generators.arc.centroid(arc);

                return (
                  <g key={arc.data.content?.toString()}>
                    <RadialContextMenuItem asChild>
                      <motion.path d={path} />
                    </RadialContextMenuItem>

                    <motion.foreignObject
                      x={cx - 12}
                      y={cy - 12}
                      width={24}
                      height={24}
                      style={{ pointerEvents: "none" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {arc.data.content}
                      </div>
                    </motion.foreignObject>
                  </g>
                );
              })}

              <motion.circle data-radial-context-menu-inner-circle r={radius.inner - 8} strokeWidth={1} />

              <motion.text data-radial-context-menu-text>Hello</motion.text>
            </motion.g>
          </motion.svg>
        </RadialContextMenuContent>
      </RadialContextMenuPortal>
    </RadialContextMenuRoot>
  );
}
