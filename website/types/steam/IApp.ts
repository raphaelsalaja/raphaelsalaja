export interface IGetAppResponse {
  success: boolean;
  data: IApp;
}
export interface IApp {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: PcRequirements;
  mac_requirements?: null[] | null;
  linux_requirements?: null[] | null;
  legal_notice: string;
  developers?: string[] | null;
  publishers?: string[] | null;
  package_groups?: null[] | null;
  platforms: Platforms;
  categories?: CategoriesEntity[] | null;
  genres?: GenresEntity[] | null;
  screenshots?: ScreenshotsEntity[] | null;
  movies?: MoviesEntity[] | null;
  release_date: ReleaseDate;
  support_info: SupportInfo;
  background: string;
  background_raw: string;
  content_descriptors: ContentDescriptors;
  ratings?: null;
}
export interface PcRequirements {
  minimum: string;
  recommended: string;
}
export interface Platforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}
export interface CategoriesEntity {
  id: number;
  description: string;
}
export interface GenresEntity {
  id: string;
  description: string;
}
export interface ScreenshotsEntity {
  id: number;
  path_thumbnail: string;
  path_full: string;
}
export interface MoviesEntity {
  id: number;
  name: string;
  thumbnail: string;
  webm: WebmOrMp4;
  mp4: WebmOrMp4;
  highlight: boolean;
}
export interface WebmOrMp4 {
  480: string;
  max: string;
}
export interface ReleaseDate {
  coming_soon: boolean;
  date: string;
}
export interface SupportInfo {
  url: string;
  email: string;
}
export interface ContentDescriptors {
  ids?: null[] | null;
  notes?: null;
}
