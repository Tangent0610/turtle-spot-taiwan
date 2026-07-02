import { imageAssets } from "@/config/assets";

export const turtleProfile = {
  code: "#TW01HOO84",
  name: "淡定哥",
} as const;

export const turtleFacts = [
  { value: "淡定哥" },
  { value: "綠蠵龜" },
  { value: "成年龜" },
  { value: "迷彩" },
  { value: "眼下四片" },
  { value: "眼下三片" },
  { value: "Chun-Ting Jeffery Liu" },
  { value: "陳坤田" },
  {
    value: "背甲中間受傷，2017/03/24記錄到時已經有受傷了，目前看起來還沒好。",
    wide: true,
  },
] satisfies { value: string; wide?: boolean }[];

export const profilePhotos = [
  {
    alt: "Left turtle face",
    labelKey: "leftFace",
    src: imageAssets.turtleLeft,
  },
  {
    alt: "Right turtle face",
    labelKey: "rightFace",
    src: imageAssets.turtleRight,
  },
] as const;
