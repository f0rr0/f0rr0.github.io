import { expect, test } from "bun:test";

import {
  CompassFaceMachine,
  FACE_MOTION_ATLAS_FRAME_ORDER,
  FACE_MOTION_POSES,
  faceMotionAtlasFrameIndex,
  poseFromClientPointer,
} from "../src/lib/face-motion";

test("pointer directions, all pose transitions, and mid-turn reversals stay in the atlas", () => {
  const rect = { left: 0, top: 0, width: 28, height: 28 };
  expect(poseFromClientPointer(14, 14, rect)).toBe("center");
  expect(poseFromClientPointer(200, 14, rect)).toBe("right");
  expect(poseFromClientPointer(14, -200, rect)).toBe("top");
  expect(FACE_MOTION_ATLAS_FRAME_ORDER).toHaveLength(57);
  for (const from of FACE_MOTION_POSES) {
    for (const to of FACE_MOTION_POSES) {
      const machine = new CompassFaceMachine(from);
      machine.setTarget(to);
      for (let step = 0; step < 8 && !machine.isSettled(); step += 1) {
        expect(faceMotionAtlasFrameIndex(machine.advance())).toBeLessThan(57);
      }
      expect(machine.isSettled()).toBe(true);
      expect(machine.getPose()).toBe(to);
    }
  }

  const machine = new CompassFaceMachine("right");
  machine.setTarget("bottom-right");
  expect(machine.advance()).toBe("right_to_bottomright_1");
  machine.setTarget("bottom");
  expect(machine.advance()).toBe("right_to_bottomright_2");
  expect(machine.advance()).toBe("right_to_bottomright_3");
  machine.setTarget("right");
  expect(machine.advance()).toBe("right_to_bottomright_2");
  expect(machine.advance()).toBe("right_to_bottomright_1");
  expect(machine.advance()).toBe("right");
  expect(machine.isSettled()).toBe(true);
});
