/** A rectangle in Figma pixels of the 1276×655 collage. */
export type CollageRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Image size and offset inside its box, as Figma percentages of the box. */
export type CollageCrop = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export type CollageImage = {
  src: string;
  rect: CollageRect;
  crop: CollageCrop;
};

/** A piece around the main image: it floats and follows the cursor. */
export type CollagePiece = CollageImage & {
  /** Drawn under the main image (Figma layer order). */
  behind?: boolean;
  /** 0–1: how far it travels with the cursor. */
  depth: number;
  /** Two 0–1 seeds for its idle float (speed, phase and amplitude). */
  seed: readonly [number, number];
};

export type CaseCollage = {
  main: CollageImage;
  pieces: readonly CollagePiece[];
};
