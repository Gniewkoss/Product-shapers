import * as migration_20260505_174545 from './20260505_174545';
import * as migration_20260505_211012 from './20260505_211012';
import * as migration_20260507_public_content_version from './20260507_public_content_version';
import * as migration_20260510_useme_bento_avatars from './20260510_useme_bento_avatars';

export const migrations = [
  {
    up: migration_20260505_174545.up,
    down: migration_20260505_174545.down,
    name: '20260505_174545',
  },
  {
    up: migration_20260505_211012.up,
    down: migration_20260505_211012.down,
    name: '20260505_211012'
  },
  {
    up: migration_20260507_public_content_version.up,
    down: migration_20260507_public_content_version.down,
    name: '20260507_public_content_version',
  },
  {
    up: migration_20260510_useme_bento_avatars.up,
    down: migration_20260510_useme_bento_avatars.down,
    name: '20260510_useme_bento_avatars',
  },
];
