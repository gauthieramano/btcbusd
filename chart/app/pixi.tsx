"use client";

import { Container, Graphics, Sprite, Stage, Text } from "@pixi/react";
import { BlurFilter, Graphics as PixiGraphics, TextStyle } from "pixi.js";
import { useCallback, useMemo } from "react";

export default function Pixi() {
  const blurFilter = useMemo(() => new BlurFilter(2), []);
  const gradient = useMemo(
    () =>
      new TextStyle({
        fill: ["#ffffff", "#00ff99"], // gradient
      }),
    []
  );

  const draw = useCallback((g: PixiGraphics) => {
    g.clear();
    // g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(50, 50);
    g.lineTo(250, 50);
    g.lineTo(100, 100);
    // g.lineTo(50, 50);
    // g.endFill();
    g.lineStyle(2, 0x0000ff, 1);
    g.beginFill(0xff700b, 1);
    g.drawRect(50, 150, 120, 120);
    g.lineStyle(2, 0xff00ff, 1);
    g.beginFill(0xff00bb, 0.25);
    g.drawRoundedRect(150, 100, 300, 100, 15);
    g.endFill();
    g.lineStyle(0);
    g.beginFill(0xffff0b, 0.5);
    g.drawCircle(470, 90, 60);
    g.endFill();
  }, []);

  return (
    <Stage>
      <Sprite
        image="https://pixijs.io/pixi-react/img/bunny.png"
        x={400}
        y={270}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <Container x={400} y={330}>
        <Text
          text="Hello World"
          anchor={{ x: 0.5, y: 0.5 }}
          filters={[blurFilter]}
          style={gradient}
        />
      </Container>

      <Graphics draw={draw} />
    </Stage>
  );
}
