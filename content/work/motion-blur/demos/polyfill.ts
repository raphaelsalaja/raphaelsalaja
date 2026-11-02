type Patched = {
  texElementSubImage2D?: unknown;
  updateElementGeometry?: unknown;
  captureElementImage?: (element: Element) => { width: number; height: number };
};

export async function polyfillHtmlInCanvas(
  canvas: HTMLCanvasElement,
  signal: AbortSignal,
) {
  const {
    getHtmlRenderer,
    installHtmlInCanvasPolyfill,
    uninstallHtmlInCanvasPolyfill,
  } = await import("three-html-render/polyfill");
  if (signal.aborted) return;

  // Each snapshot gets its own <body>, and the site's flex-centred body would
  // push the drawable out of frame.
  installHtmlInCanvasPolyfill({
    force: true,
    pageStyles: "body { display: block; }",
  });

  const context = WebGL2RenderingContext.prototype as Patched;
  const element = HTMLCanvasElement.prototype as Patched;
  const capture = element.captureElementImage;

  context.texElementSubImage2D = function (
    this: WebGL2RenderingContext,
    target: number,
    level: number,
    x: number,
    y: number,
    source: Element,
  ) {
    const image = getHtmlRenderer().getCanvas(source as HTMLElement);
    if (!image) throw new DOMException("No snapshot yet", "InvalidStateError");
    this.texSubImage2D(
      target,
      level,
      x,
      y,
      this.RGBA,
      this.UNSIGNED_BYTE,
      image,
    );
  };

  element.captureElementImage = function (
    this: HTMLCanvasElement,
    source: Element,
  ) {
    const image = capture?.call(this, source) ?? { width: 0, height: 0 };
    return { width: image.width, height: image.height, close() {} };
  };

  // Moving the drawable restyles it, and the polyfill re-rasterizes on every
  // style mutation, so hit-testing stays where the polyfill put it.
  element.updateElementGeometry = () => {};

  canvas.setAttribute("layoutsubtree", "");

  return () => {
    canvas.removeAttribute("layoutsubtree");
    delete context.texElementSubImage2D;
    delete element.updateElementGeometry;
    uninstallHtmlInCanvasPolyfill();
  };
}
