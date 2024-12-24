import Arena from "are.na";

import type { GraphData } from "../types/graph";

const arena = new Arena({
  accessToken: "xUL8AvT4OQE4Yesa8glQdJNoGtTqgD_lOx1blFqXcwE",
});

export async function getDataFromURL(url: string) {
  const data: GraphData = {
    nodes: [],
    links: [],
  };

  if (url.includes("/block/")) {
    const slug = url.split("/block/")[1];
    const connections = arena.block(slug).channels();
    const slugs = (await connections).map((connections) => connections.slug);
    const channels = await Promise.all(slugs.map((slug) => arena.channel(slug).get()));

    for (const channel of channels) {
      data.nodes.push({
        id: channel.id.toString(),
        arena: channel,
      });

      for (const block of channel.contents || []) {
        data.nodes.push({
          id: block.id.toString(),
          arena: block,
        });

        data.links.push({
          source: channel.id.toString(),
          target: block.id.toString(),
        });
      }
    }
  } else {
    const slug = url.split("/").slice(-1)[0];
    const channel = await arena.channel(slug).get();
    data.nodes.push({
      id: channel.id.toString(),
      arena: channel,
    });
    for (const block of channel.contents || []) {
      data.nodes.push({
        id: block.id.toString(),
        arena: block,
      });

      data.links.push({
        source: channel.id.toString(),
        target: block.id.toString(),
      });
    }
  }

  return data;
}

export async function getDataFromSearch(query: string) {
  const data: GraphData = {
    nodes: [],
    links: [],
  };

  const results = await arena.search(query).all();

  const channels = results.channels;
  const blocks = results.blocks;

  for (const channel of channels ?? []) {
    data.nodes.push({
      id: channel.id.toString(),
      arena: channel,
    });

    for (const block of channel.contents || []) {
      data.nodes.push({
        id: block.id.toString(),
        arena: block,
      });

      data.links.push({
        source: channel.id.toString(),
        target: block.id.toString(),
      });
    }
  }

  for (const block of blocks ?? []) {
    data.nodes.push({
      id: block.id.toString(),
      arena: block,
    });
  }

  return data;
}
