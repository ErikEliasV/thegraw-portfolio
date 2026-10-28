/** Studio services, used to filter the cases. */
export type ServiceId = "branding" | "web-design" | "packpaging";

export type Project = {
  slug: string;
  /** Short name used on cards and the cases index ("Allce"). */
  name: string;
  /** Headline used on the featured slider and project page. */
  title: string;
  client: string;
  category: string;
  year: string;
  services: readonly ServiceId[];
  cover: string;
  thumbnail: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
  deliverables: readonly [readonly string[], readonly string[]];
};
