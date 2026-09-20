import * as migration_20260920_174047_gallery_additional_images from './20260920_174047_gallery_additional_images';

export const migrations = [
  {
    up: migration_20260920_174047_gallery_additional_images.up,
    down: migration_20260920_174047_gallery_additional_images.down,
    name: '20260920_174047_gallery_additional_images'
  },
];
